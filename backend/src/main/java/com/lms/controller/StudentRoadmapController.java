package com.lms.controller;

import com.lms.dto.response.BadgeResponse;
import com.lms.dto.response.RoadmapResponse;
import com.lms.dto.response.RoadmapTopicResponse;
import com.lms.service.BadgeService;
import com.lms.service.RoadmapService;
import com.lms.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/student")
@PreAuthorize("hasRole('STUDENT')")
public class StudentRoadmapController {

    @Autowired
    private RoadmapService roadmapService;

    @Autowired
    private BadgeService badgeService;

    @Autowired
    private StudentService studentService;

    @GetMapping("/roadmaps")
    public ResponseEntity<List<RoadmapResponse>> getAllRoadmaps(Authentication authentication) {
        Long studentId = studentService.getCurrentStudentId(authentication);
        List<RoadmapResponse> roadmaps = roadmapService.getAllRoadmaps(studentId);
        return ResponseEntity.ok(roadmaps);
    }

    @GetMapping("/roadmap/{roadmapId}")
    public ResponseEntity<RoadmapResponse> getRoadmap(
            @PathVariable Long roadmapId,
            Authentication authentication) {
        Long studentId = studentService.getCurrentStudentId(authentication);
        RoadmapResponse roadmap = roadmapService.getRoadmapById(roadmapId, studentId);
        return ResponseEntity.ok(roadmap);
    }

    @PostMapping("/roadmap/topic/{topicId}/complete")
    public ResponseEntity<RoadmapTopicResponse> markTopicComplete(
            @PathVariable Long topicId,
            Authentication authentication) {
        Long studentId = studentService.getCurrentStudentId(authentication);
        RoadmapTopicResponse response = roadmapService.markTopicComplete(topicId, studentId);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/badges")
    public ResponseEntity<List<BadgeResponse>> getMyBadges(Authentication authentication) {
        Long studentId = studentService.getCurrentStudentId(authentication);
        List<BadgeResponse> badges = badgeService.getStudentBadges(studentId);
        return ResponseEntity.ok(badges);
    }
}
