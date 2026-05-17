package com.lms.service;

import com.lms.dto.request.SubmitFeedbackRequest;
import com.lms.dto.response.FeedbackResponse;
import com.lms.entity.Feedback;
import com.lms.entity.FeedbackCategory;
import com.lms.entity.StudentProfile;
import com.lms.entity.User;
import com.lms.exception.BadRequestException;
import com.lms.exception.ResourceNotFoundException;
import com.lms.repository.FeedbackCategoryRepository;
import com.lms.repository.FeedbackRepository;
import com.lms.repository.StudentProfileRepository;
import com.lms.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@Slf4j
public class FeedbackService {

    @Autowired
    private FeedbackRepository feedbackRepository;

    @Autowired
    private FeedbackCategoryRepository feedbackCategoryRepository;

    @Autowired
    private StudentProfileRepository studentProfileRepository;

    @Autowired
    private UserRepository userRepository;

    @Transactional
    public FeedbackResponse submitFeedback(Long studentId, SubmitFeedbackRequest request) {
        log.info("Submitting feedback for student: {}", studentId);
        
        StudentProfile student = studentProfileRepository.findById(studentId)
                .orElseThrow(() -> new ResourceNotFoundException("Student", "id", studentId));

        FeedbackCategory category = feedbackCategoryRepository.findByCategoryName(request.getCategoryName())
                .orElseThrow(() -> new BadRequestException("Invalid feedback category"));

        Feedback feedback = new Feedback();
        feedback.setStudent(student);
        feedback.setCategory(category);
        feedback.setRating(request.getRating());
        feedback.setMessage(request.getMessage());
        feedback.setIsAnonymous(request.getIsAnonymous());
        feedback.setStatus(Feedback.FeedbackStatus.PENDING);

        Feedback saved = feedbackRepository.save(feedback);
        log.info("Feedback submitted successfully. ID: {}", saved.getFeedbackId());

        return mapToResponse(saved, false);
    }

    public Page<FeedbackResponse> getAllFeedback(boolean includeStudentInfo, Pageable pageable) {
        log.debug("Fetching all feedback with page: {}", pageable);
        Page<Feedback> feedbacks = feedbackRepository.findAllByOrderByCreatedAtDesc(pageable);
        return feedbacks.map(f -> mapToResponse(f, includeStudentInfo));
    }

    public Page<FeedbackResponse> getFeedbackByStatus(Feedback.FeedbackStatus status, boolean includeStudentInfo, Pageable pageable) {
        log.debug("Fetching feedback by status: {}", status);
        Page<Feedback> feedbacks = feedbackRepository.findByStatusOrderByCreatedAtDesc(status, pageable);
        return feedbacks.map(f -> mapToResponse(f, includeStudentInfo));
    }

    @Transactional
    public FeedbackResponse updateFeedbackStatus(Long feedbackId, Feedback.FeedbackStatus status, Long adminId) {
        log.info("Updating feedback {} status to {} by admin {}", feedbackId, status, adminId);
        
        Feedback feedback = feedbackRepository.findById(feedbackId)
                .orElseThrow(() -> new ResourceNotFoundException("Feedback", "id", feedbackId));

        User admin = userRepository.findById(adminId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", adminId));

        feedback.setStatus(status);
        feedback.setReviewedBy(admin);
        feedback.setReviewedAt(LocalDateTime.now());

        feedbackRepository.save(feedback);

        return mapToResponse(feedback, true);
    }

    private FeedbackResponse mapToResponse(Feedback feedback, boolean includeStudentInfo) {
        FeedbackResponse response = new FeedbackResponse();
        response.setFeedbackId(feedback.getFeedbackId());
        response.setCategoryName(feedback.getCategory().getCategoryName());
        response.setRating(feedback.getRating());
        response.setMessage(feedback.getMessage());
        response.setIsAnonymous(feedback.getIsAnonymous());
        response.setStatus(feedback.getStatus());
        response.setCreatedAt(feedback.getCreatedAt());

        // Include student info only for admin
        if (includeStudentInfo) {
            User student = feedback.getStudent().getUser();
            response.setStudentName(student.getName());
            response.setStudentEmail(student.getEmail());
            response.setRollNumber(feedback.getStudent().getRollNumber());
        }

        return response;
    }
}
