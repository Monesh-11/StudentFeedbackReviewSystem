package com.lms.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CodeExecutionRequest {
    @NotBlank(message = "Source code is required")
    private String sourceCode;

    @NotNull(message = "Language ID is required")
    private Integer languageId;

    private String stdin;
}
