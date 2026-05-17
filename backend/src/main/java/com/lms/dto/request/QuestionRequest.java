package com.lms.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
public class QuestionRequest {
    @NotBlank(message = "Question text is required")
    private String questionText;
    
    @NotBlank(message = "Option A is required")
    private String optionA;
    
    @NotBlank(message = "Option B is required")
    private String optionB;
    
    @NotBlank(message = "Option C is required")
    private String optionC;
    
    @NotBlank(message = "Option D is required")
    private String optionD;
    
    @NotNull(message = "Correct answer is required")
    @Pattern(regexp = "[A-D]", message = "Correct answer must be A, B, C, or D")
    private String correctAnswer;
    
    @NotNull(message = "Marks are required")
    private Integer marks;
}
