package com.lms.controller;

import com.lms.dto.request.AddSkillRequest;
import com.lms.dto.request.UpdateStudentProfileRequest;
import com.lms.dto.response.MessageResponse;
import com.lms.dto.response.SkillDTO;
import com.lms.dto.response.StudentDashboardResponse;
import com.lms.dto.response.StudentProfileResponse;
import com.lms.service.StudentService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/student")
@PreAuthorize("hasRole('STUDENT')")
public class StudentController {

    @Autowired
    private StudentService studentService;

    @GetMapping("/profile")
    public ResponseEntity<StudentProfileResponse> getProfile(Authentication authentication) {
        Long studentId = studentService.getCurrentStudentId(authentication);
        StudentProfileResponse response = studentService.getProfile(studentId);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/profile")
    public ResponseEntity<StudentProfileResponse> updateProfile(
            @Valid @RequestBody UpdateStudentProfileRequest request,
            Authentication authentication) {
        Long studentId = studentService.getCurrentStudentId(authentication);
        StudentProfileResponse response = studentService.updateProfile(studentId, request);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/skills")
    public ResponseEntity<SkillDTO> addSkill(
            @Valid @RequestBody AddSkillRequest request,
            Authentication authentication) {
        Long studentId = studentService.getCurrentStudentId(authentication);
        SkillDTO response = studentService.addSkill(studentId, request);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/dashboard")
    public ResponseEntity<StudentDashboardResponse> getDashboard(Authentication authentication) {
        Long studentId = studentService.getCurrentStudentId(authentication);
        StudentDashboardResponse response = studentService.getDashboard(studentId);
        return ResponseEntity.ok(response);
    }
}
