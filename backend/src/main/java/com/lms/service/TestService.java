package com.lms.service;

import com.lms.dto.request.CreateTestRequest;
import com.lms.dto.request.QuestionRequest;
import com.lms.dto.request.SubmitTestRequest;
import com.lms.dto.response.QuestionResponse;
import com.lms.dto.response.TestResponse;
import com.lms.dto.response.TestResultResponse;
import com.lms.entity.*;
import com.lms.exception.BadRequestException;
import com.lms.exception.ResourceNotFoundException;
import com.lms.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class TestService {

    @Autowired
    private TestRepository testRepository;

    @Autowired
    private StaffProfileRepository staffProfileRepository;

    @Autowired
    private StudentProfileRepository studentProfileRepository;

    @Autowired
    private TestAttemptRepository testAttemptRepository;

    @Transactional
    public TestResponse createTest(Long staffId, CreateTestRequest request) {
        StaffProfile staff = staffProfileRepository.findById(staffId)
                .orElseThrow(() -> new ResourceNotFoundException("Staff", "id", staffId));

        // Calculate total marks
        int totalMarks = request.getQuestions().stream()
                .mapToInt(QuestionRequest::getMarks)
                .sum();

        Test test = new Test();
        test.setTitle(request.getTitle());
        test.setSubject(request.getSubject());
        test.setCreatedBy(staff);
        test.setDurationMinutes(request.getDurationMinutes());
        test.setTotalMarks(totalMarks);
        test.setTotalQuestions(request.getQuestions().size());
        test.setScheduledDate(request.getScheduledDate());
        test.setStatus(Test.TestStatus.UPCOMING);

        // Add questions
        List<Question> questions = new ArrayList<>();
        for (int i = 0; i < request.getQuestions().size(); i++) {
            QuestionRequest qReq = request.getQuestions().get(i);
            Question question = new Question();
            question.setTest(test);
            question.setQuestionText(qReq.getQuestionText());
            question.setOptionA(qReq.getOptionA());
            question.setOptionB(qReq.getOptionB());
            question.setOptionC(qReq.getOptionC());
            question.setOptionD(qReq.getOptionD());
            question.setCorrectAnswer(qReq.getCorrectAnswer().charAt(0));
            question.setMarks(qReq.getMarks());
            question.setQuestionOrder(i + 1);
            questions.add(question);
        }
        test.setQuestions(questions);

        Test saved = testRepository.save(test);
        return mapToTestResponse(saved, false);
    }

    public List<TestResponse> getTestsByStaff(Long staffId) {
        List<Test> tests = testRepository.findByCreatedByStaffId(staffId);
        return tests.stream()
                .map(t -> mapToTestResponse(t, false))
                .collect(Collectors.toList());
    }

    public List<TestResponse> getAllTests() {
        List<Test> tests = testRepository.findAll();
        return tests.stream()
                .map(t -> mapToTestResponse(t, false))
                .collect(Collectors.toList());
    }

    public TestResponse getTestById(Long testId, boolean includeAnswers) {
        Test test = testRepository.findById(testId)
                .orElseThrow(() -> new ResourceNotFoundException("Test", "id", testId));
        return mapToTestResponse(test, includeAnswers);
    }

    @Transactional
    public TestResultResponse submitTest(Long testId, Long studentId, SubmitTestRequest request, LocalDateTime startTime) {
        Test test = testRepository.findById(testId)
                .orElseThrow(() -> new ResourceNotFoundException("Test", "id", testId));

        StudentProfile student = studentProfileRepository.findById(studentId)
                .orElseThrow(() -> new ResourceNotFoundException("Student", "id", studentId));

        // Check if already attempted
        if (testAttemptRepository.findByTestTestIdAndStudentStudentId(testId, studentId).isPresent()) {
            throw new BadRequestException("Test already attempted");
        }

        LocalDateTime endTime = LocalDateTime.now();
        long timeTaken = Duration.between(startTime, endTime).toMinutes();

        // Calculate score
        Map<Long, String> answers = request.getAnswers();
        int correctCount = 0;
        int wrongCount = 0;
        int unattempted = 0;
        BigDecimal totalScore = BigDecimal.ZERO;

        List<StudentAnswer> studentAnswers = new ArrayList<>();

        for (Question question : test.getQuestions()) {
            String selectedAnswer = answers.get(question.getQuestionId());
            
            StudentAnswer studentAnswer = new StudentAnswer();
            studentAnswer.setQuestion(question);
            
            if (selectedAnswer == null || selectedAnswer.isEmpty()) {
                unattempted++;
                studentAnswer.setSelectedAnswer(null);
                studentAnswer.setIsCorrect(false);
                studentAnswer.setMarksObtained(BigDecimal.ZERO);
            } else {
                studentAnswer.setSelectedAnswer(selectedAnswer.charAt(0));
                boolean isCorrect = selectedAnswer.charAt(0) == question.getCorrectAnswer();
                studentAnswer.setIsCorrect(isCorrect);
                
                if (isCorrect) {
                    correctCount++;
                    studentAnswer.setMarksObtained(BigDecimal.valueOf(question.getMarks()));
                    totalScore = totalScore.add(BigDecimal.valueOf(question.getMarks()));
                } else {
                    wrongCount++;
                    studentAnswer.setMarksObtained(BigDecimal.ZERO);
                }
            }
            
            studentAnswers.add(studentAnswer);
        }

        BigDecimal percentage = totalScore
                .multiply(BigDecimal.valueOf(100))
                .divide(BigDecimal.valueOf(test.getTotalMarks()), 2, RoundingMode.HALF_UP);

        // Create test attempt
        TestAttempt attempt = new TestAttempt();
        attempt.setTest(test);
        attempt.setStudent(student);
        attempt.setScore(totalScore);
        attempt.setTotalMarks(test.getTotalMarks());
        attempt.setPercentage(percentage);
        attempt.setCorrectAnswers(correctCount);
        attempt.setWrongAnswers(wrongCount);
        attempt.setUnattempted(unattempted);
        attempt.setTimeTakenMinutes((int) timeTaken);
        attempt.setStartedAt(startTime);
        attempt.setSubmittedAt(endTime);

        // Link student answers to attempt
        for (StudentAnswer sa : studentAnswers) {
            sa.setAttempt(attempt);
        }
        attempt.setAnswers(studentAnswers);

        TestAttempt saved = testAttemptRepository.save(attempt);

        // Calculate rank
        calculateRank(saved);

        return mapToTestResultResponse(saved);
    }

    private void calculateRank(TestAttempt attempt) {
        List<TestAttempt> allAttempts = testAttemptRepository.findByTestIdOrderByScoreDesc(attempt.getTest().getTestId());
        for (int i = 0; i < allAttempts.size(); i++) {
            allAttempts.get(i).setRank(i + 1);
            testAttemptRepository.save(allAttempts.get(i));
        }
    }

    public TestResultResponse getTestResult(Long testId, Long studentId) {
        TestAttempt attempt = testAttemptRepository.findByTestTestIdAndStudentStudentId(testId, studentId)
                .orElseThrow(() -> new ResourceNotFoundException("Test result not found"));
        return mapToTestResultResponse(attempt);
    }

    public List<TestResultResponse> getTestResults(Long testId) {
        List<TestAttempt> attempts = testAttemptRepository.findByTestIdOrderByScoreDesc(testId);
        return attempts.stream()
                .map(this::mapToTestResultResponse)
                .collect(Collectors.toList());
    }

    private TestResponse mapToTestResponse(Test test, boolean includeAnswers) {
        TestResponse response = new TestResponse();
        response.setTestId(test.getTestId());
        response.setTitle(test.getTitle());
        response.setSubject(test.getSubject());
        response.setCreatedBy(test.getCreatedBy().getUser().getName());
        response.setDurationMinutes(test.getDurationMinutes());
        response.setTotalMarks(test.getTotalMarks());
        response.setTotalQuestions(test.getTotalQuestions());
        response.setScheduledDate(test.getScheduledDate());
        response.setStatus(test.getStatus());

        List<QuestionResponse> questions = test.getQuestions().stream()
                .map(q -> {
                    QuestionResponse qr = new QuestionResponse();
                    qr.setQuestionId(q.getQuestionId());
                    qr.setQuestionText(q.getQuestionText());
                    qr.setOptionA(q.getOptionA());
                    qr.setOptionB(q.getOptionB());
                    qr.setOptionC(q.getOptionC());
                    qr.setOptionD(q.getOptionD());
                    qr.setMarks(q.getMarks());
                    qr.setQuestionOrder(q.getQuestionOrder());
                    if (includeAnswers) {
                        qr.setCorrectAnswer(q.getCorrectAnswer());
                    }
                    return qr;
                })
                .collect(Collectors.toList());

        response.setQuestions(questions);
        return response;
    }

    private TestResultResponse mapToTestResultResponse(TestAttempt attempt) {
        TestResultResponse response = new TestResultResponse();
        response.setAttemptId(attempt.getAttemptId());
        response.setTestId(attempt.getTest().getTestId());
        response.setTestTitle(attempt.getTest().getTitle());
        response.setScore(attempt.getScore());
        response.setTotalMarks(attempt.getTotalMarks());
        response.setPercentage(attempt.getPercentage());
        response.setCorrectAnswers(attempt.getCorrectAnswers());
        response.setWrongAnswers(attempt.getWrongAnswers());
        response.setUnattempted(attempt.getUnattempted());
        response.setTimeTakenMinutes(attempt.getTimeTakenMinutes());
        response.setRank(attempt.getRank());
        response.setSubmittedAt(attempt.getSubmittedAt());

        // Include questions with answers
        List<QuestionResponse> questions = attempt.getAnswers().stream()
                .map(sa -> {
                    Question q = sa.getQuestion();
                    QuestionResponse qr = new QuestionResponse();
                    qr.setQuestionId(q.getQuestionId());
                    qr.setQuestionText(q.getQuestionText());
                    qr.setOptionA(q.getOptionA());
                    qr.setOptionB(q.getOptionB());
                    qr.setOptionC(q.getOptionC());
                    qr.setOptionD(q.getOptionD());
                    qr.setMarks(q.getMarks());
                    qr.setQuestionOrder(q.getQuestionOrder());
                    qr.setCorrectAnswer(q.getCorrectAnswer());
                    qr.setSelectedAnswer(sa.getSelectedAnswer());
                    qr.setIsCorrect(sa.getIsCorrect());
                    return qr;
                })
                .collect(Collectors.toList());

        response.setQuestions(questions);
        return response;
    }
}
