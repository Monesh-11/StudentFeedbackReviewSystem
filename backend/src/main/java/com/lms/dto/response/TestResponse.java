package com.lms.dto.response;

import com.lms.entity.Test;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TestResponse {
    private Long testId;
    private String title;
    private String subject;
    private String createdBy;
    private Integer durationMinutes;
    private Integer totalMarks;
    private Integer totalQuestions;
    private LocalDateTime scheduledDate;
    private Test.TestStatus status;
    private List<QuestionResponse> questions;
}
