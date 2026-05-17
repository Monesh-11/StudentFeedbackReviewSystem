package com.lms.controller;

import com.lms.dto.request.SubmitTestRequest;
import com.lms.dto.response.TestResponse;
import com.lms.dto.response.TestResultResponse;
import com.lms.service.StudentService;
import com.lms.service.TestService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/student/test")
@PreAuthorize("hasRole('STUDENT')")
public class StudentTestController {

    @Autowired
    private TestService testService;

    @Autowired
    private StudentService studentService;

    @GetMapping
    public ResponseEntity<List<TestResponse>> getAllTests() {
        List<TestResponse> tests = testService.getAllTests();
        return ResponseEntity.ok(tests);
    }

    @GetMapping("/{testId}")
    public ResponseEntity<TestResponse> getTest(@PathVariable Long testId) {
        // Don't include answers for students taking the test
        TestResponse response = testService.getTestById(testId, false);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/{testId}/submit")
    public ResponseEntity<TestResultResponse> submitTest(
            @PathVariable Long testId,
            @Valid @RequestBody SubmitTestRequest request,
            @RequestParam LocalDateTime startTime,
            Authentication authentication) {
        Long studentId = studentService.getCurrentStudentId(authentication);
        TestResultResponse response = testService.submitTest(testId, studentId, request, startTime);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{testId}/result")
    public ResponseEntity<TestResultResponse> getTestResult(
            @PathVariable Long testId,
            Authentication authentication) {
        Long studentId = studentService.getCurrentStudentId(authentication);
        TestResultResponse response = testService.getTestResult(testId, studentId);
        return ResponseEntity.ok(response);
    }
}
