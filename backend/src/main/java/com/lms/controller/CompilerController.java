package com.lms.controller;

import com.lms.dto.request.CodeExecutionRequest;
import com.lms.dto.response.CodeExecutionResponse;
import com.lms.service.CompilerService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/compiler")
public class CompilerController {

    @Autowired
    private CompilerService compilerService;

    @PostMapping("/execute")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<CodeExecutionResponse> executeCode(@Valid @RequestBody CodeExecutionRequest request) {
        CodeExecutionResponse response = compilerService.executeCode(request);
        return ResponseEntity.ok(response);
    }
}
