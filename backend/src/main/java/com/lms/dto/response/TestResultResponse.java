package com.lms.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TestResultResponse {
    private Long attemptId;
    private Long testId;
    private String testTitle;
    private BigDecimal score;
    private Integer totalMarks;
    private BigDecimal percentage;
    private Integer correctAnswers;
    private Integer wrongAnswers;
    private Integer unattempted;
    private Integer timeTakenMinutes;
    private Integer rank;
    private LocalDateTime submittedAt;
    private List<QuestionResponse> questions;
}
