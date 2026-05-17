package com.lms.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.Map;

@Data
public class SubmitTestRequest {
    @NotNull(message = "Answers are required")
    private Map<Long, String> answers; // questionId -> selectedAnswer (A/B/C/D)
}
