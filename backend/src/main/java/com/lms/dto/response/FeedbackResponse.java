package com.lms.dto.response;

import com.lms.entity.Feedback;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FeedbackResponse {
    private Long feedbackId;
    private String categoryName;
    private Integer rating;
    private String message;
    private Boolean isAnonymous;
    private Feedback.FeedbackStatus status;
    private LocalDateTime createdAt;
    
    // Only for admin
    private String studentName;
    private String studentEmail;
    private String rollNumber;
}
