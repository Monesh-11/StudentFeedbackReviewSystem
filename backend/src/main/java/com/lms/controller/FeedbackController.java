package com.lms.controller;

import com.lms.dto.request.SubmitFeedbackRequest;
import com.lms.dto.response.FeedbackResponse;
import com.lms.entity.Feedback;
import com.lms.service.FeedbackService;
import com.lms.service.StudentService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/feedback")
public class FeedbackController {

    @Autowired
    private FeedbackService feedbackService;

    @Autowired
    private StudentService studentService;

    @PostMapping("/submit")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<FeedbackResponse> submitFeedback(
            @Valid @RequestBody SubmitFeedbackRequest request,
            Authentication authentication) {
        Long studentId = studentService.getCurrentStudentId(authentication);
        FeedbackResponse response = feedbackService.submitFeedback(studentId, request);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/staff")
    @PreAuthorize("hasRole('STAFF')")
    public ResponseEntity<Page<FeedbackResponse>> getStaffFeedback(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        // Staff cannot see student identity
        Pageable pageable = PageRequest.of(page, size);
        Page<FeedbackResponse> feedbacks = feedbackService.getAllFeedback(false, pageable);
        return ResponseEntity.ok(feedbacks);
    }

    @GetMapping("/admin")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Page<FeedbackResponse>> getAdminFeedback(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        // Admin can see student identity
        Pageable pageable = PageRequest.of(page, size);
        Page<FeedbackResponse> feedbacks = feedbackService.getAllFeedback(true, pageable);
        return ResponseEntity.ok(feedbacks);
    }

    @GetMapping("/admin/status/{status}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Page<FeedbackResponse>> getFeedbackByStatus(
            @PathVariable String status,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Feedback.FeedbackStatus feedbackStatus = Feedback.FeedbackStatus.valueOf(status.toUpperCase());
        Pageable pageable = PageRequest.of(page, size);
        Page<FeedbackResponse> feedbacks = feedbackService.getFeedbackByStatus(feedbackStatus, true, pageable);
        return ResponseEntity.ok(feedbacks);
    }
}
