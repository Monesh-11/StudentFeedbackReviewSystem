package com.lms.dto.response;

import lombok.Data;

@Data
public class CodeExecutionResponse {
    private String stdout;
    private String stderr;
    private String compileOutput;
    private String message;
    private String status; // Description (e.g., "Accepted", "Compilation Error")
    private String time;
    private String memory;
}
