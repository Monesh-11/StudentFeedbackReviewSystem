package com.lms.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class SubmitFeedbackRequest {
    @NotBlank(message = "Category is required")
    private String categoryName;
    
    private Integer rating;
    
    @NotBlank(message = "Message is required")
    private String message;
    
    private Boolean isAnonymous = true;
}
