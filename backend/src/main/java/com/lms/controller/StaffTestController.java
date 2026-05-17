package com.lms.controller;

import com.lms.dto.request.CreateTestRequest;
import com.lms.dto.response.TestResponse;
import com.lms.dto.response.TestResultResponse;
import com.lms.service.TestService;
import com.lms.service.StudentService;
import com.lms.security.UserPrincipal;
import com.lms.repository.UserRepository;
import com.lms.entity.User;
import com.lms.exception.ResourceNotFoundException;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/staff/test")
@PreAuthorize("hasRole('STAFF')")
public class StaffTestController {

    @Autowired
    private TestService testService;

    @Autowired
    private UserRepository userRepository;

    @PostMapping
    public ResponseEntity<TestResponse> createTest(
            @Valid @RequestBody CreateTestRequest request,
            Authentication authentication) {
        Long staffId = getCurrentStaffId(authentication);
        TestResponse response = testService.createTest(staffId, request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping
    public ResponseEntity<List<TestResponse>> getMyTests(Authentication authentication) {
        Long staffId = getCurrentStaffId(authentication);
        List<TestResponse> tests = testService.getTestsByStaff(staffId);
        return ResponseEntity.ok(tests);
    }

    @GetMapping("/{testId}")
    public ResponseEntity<TestResponse> getTest(@PathVariable Long testId) {
        TestResponse response = testService.getTestById(testId, true);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{testId}/results")
    public ResponseEntity<List<TestResultResponse>> getTestResults(@PathVariable Long testId) {
        List<TestResultResponse> results = testService.getTestResults(testId);
        return ResponseEntity.ok(results);
    }

    private Long getCurrentStaffId(Authentication authentication) {
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        User user = userRepository.findByEmail(userPrincipal.getEmail())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return user.getUserId();
    }
}
