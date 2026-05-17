package com.lms.service;

import com.lms.dto.response.BadgeResponse;
import com.lms.entity.Badge;
import com.lms.entity.StudentBadge;
import com.lms.entity.StudentProfile;
import com.lms.exception.ResourceNotFoundException;
import com.lms.repository.BadgeRepository;
import com.lms.repository.StudentBadgeRepository;
import com.lms.repository.StudentProfileRepository;
import com.lms.repository.TestAttemptRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class BadgeService {

    @Autowired
    private BadgeRepository badgeRepository;

    @Autowired
    private StudentBadgeRepository studentBadgeRepository;

    @Autowired
    private StudentProfileRepository studentProfileRepository;

    @Autowired
    private TestAttemptRepository testAttemptRepository;

    public List<BadgeResponse> getStudentBadges(Long studentId) {
        List<StudentBadge> studentBadges = studentBadgeRepository.findByStudentStudentId(studentId);
        return studentBadges.stream()
                .map(this::mapToBadgeResponse)
                .collect(Collectors.toList());
    }

    @Transactional
    public void checkAndAwardBadges(Long studentId) {
        StudentProfile student = studentProfileRepository.findById(studentId)
                .orElseThrow(() -> new ResourceNotFoundException("Student", "id", studentId));

        // Check for "First Test" badge
        awardBadgeIfEligible(student, "First Test", () -> {
            Long testsCompleted = testAttemptRepository.countByStudentId(studentId);
            return testsCompleted >= 1;
        });

        // Check for "High Achiever" badge (90%+ average)
        awardBadgeIfEligible(student, "High Achiever", () -> {
            BigDecimal avgScore = testAttemptRepository.getAveragePercentageByStudent(studentId);
            return avgScore != null && avgScore.compareTo(BigDecimal.valueOf(90)) >= 0;
        });

        // Check for "Test Master" badge (10+ tests)
        awardBadgeIfEligible(student, "Test Master", () -> {
            Long testsCompleted = testAttemptRepository.countByStudentId(studentId);
            return testsCompleted >= 10;
        });

        // Check for "Perfect Score" badge (100% in any test)
        awardBadgeIfEligible(student, "Perfect Score", () -> {
            return testAttemptRepository.findByStudentStudentId(studentId).stream()
                    .anyMatch(attempt -> attempt.getPercentage().compareTo(BigDecimal.valueOf(100)) == 0);
        });

        // Check for "Consistent Performer" badge (5+ tests with 80%+)
        awardBadgeIfEligible(student, "Consistent Performer", () -> {
            long count = testAttemptRepository.findByStudentStudentId(studentId).stream()
                    .filter(attempt -> attempt.getPercentage().compareTo(BigDecimal.valueOf(80)) >= 0)
                    .count();
            return count >= 5;
        });
    }

    private void awardBadgeIfEligible(StudentProfile student, String badgeName, BadgeEligibilityChecker checker) {
        // Check if already has badge
        Badge badge = badgeRepository.findByBadgeName(badgeName).orElse(null);
        if (badge == null) return;

        boolean alreadyHas = studentBadgeRepository.existsByStudentStudentIdAndBadgeBadgeId(
                student.getStudentId(), badge.getBadgeId());

        if (!alreadyHas && checker.isEligible()) {
            StudentBadge studentBadge = new StudentBadge();
            studentBadge.setStudent(student);
            studentBadge.setBadge(badge);
            studentBadge.setEarnedAt(LocalDateTime.now());
            studentBadgeRepository.save(studentBadge);
        }
    }

    private BadgeResponse mapToBadgeResponse(StudentBadge studentBadge) {
        Badge badge = studentBadge.getBadge();
        return new BadgeResponse(
                badge.getBadgeId(),
                badge.getBadgeName(),
                badge.getDescription(),
                badge.getIcon(),
                badge.getColor(),
                badge.getCriteria(),
                studentBadge.getEarnedAt()
        );
    }

    @FunctionalInterface
    private interface BadgeEligibilityChecker {
        boolean isEligible();
    }
}
