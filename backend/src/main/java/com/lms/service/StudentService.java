package com.lms.service;

import com.lms.dto.request.AddSkillRequest;
import com.lms.dto.request.UpdateStudentProfileRequest;
import com.lms.dto.response.SkillDTO;
import com.lms.dto.response.StudentDashboardResponse;
import com.lms.dto.response.StudentProfileResponse;
import com.lms.entity.StudentProfile;
import com.lms.entity.StudentSkill;
import com.lms.entity.User;
import com.lms.exception.ResourceNotFoundException;
import com.lms.repository.*;
import com.lms.security.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class StudentService {

    @Autowired
    private StudentProfileRepository studentProfileRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TestAttemptRepository testAttemptRepository;

    @Autowired
    private StudentBadgeRepository studentBadgeRepository;

    @Autowired
    private StudentTopicProgressRepository studentTopicProgressRepository;

    @Autowired
    private TestRepository testRepository;

    public StudentProfileResponse getProfile(Long studentId) {
        StudentProfile profile = studentProfileRepository.findByIdWithSkills(studentId)
                .orElseThrow(() -> new ResourceNotFoundException("Student", "id", studentId));

        User user = profile.getUser();

        List<SkillDTO> skills = profile.getSkills().stream()
                .map(skill -> new SkillDTO(skill.getSkillId(), skill.getSkillName(), skill.getProficiencyLevel()))
                .collect(Collectors.toList());

        StudentProfileResponse response = new StudentProfileResponse();
        response.setStudentId(profile.getStudentId());
        response.setName(user.getName());
        response.setEmail(user.getEmail());
        response.setRollNumber(profile.getRollNumber());
        response.setDepartment(profile.getDepartment());
        response.setYear(profile.getYear());
        response.setSemester(profile.getSemester());
        response.setProfileImageUrl(profile.getProfileImageUrl());
        response.setResumeUrl(profile.getResumeUrl());
        response.setGithubUrl(profile.getGithubUrl());
        response.setLinkedinUrl(profile.getLinkedinUrl());
        response.setPortfolioUrl(profile.getPortfolioUrl());
        response.setCurrentStreak(profile.getCurrentStreak());
        response.setTotalProblemsSolved(profile.getTotalProblemsSolved());
        response.setSkills(skills);

        return response;
    }

    @Transactional
    public StudentProfileResponse updateProfile(Long studentId, UpdateStudentProfileRequest request) {
        StudentProfile profile = studentProfileRepository.findById(studentId)
                .orElseThrow(() -> new ResourceNotFoundException("Student", "id", studentId));

        if (request.getGithubUrl() != null) profile.setGithubUrl(request.getGithubUrl());
        if (request.getLinkedinUrl() != null) profile.setLinkedinUrl(request.getLinkedinUrl());
        if (request.getPortfolioUrl() != null) profile.setPortfolioUrl(request.getPortfolioUrl());
        if (request.getResumeUrl() != null) profile.setResumeUrl(request.getResumeUrl());
        if (request.getProfileImageUrl() != null) profile.setProfileImageUrl(request.getProfileImageUrl());

        studentProfileRepository.save(profile);

        return getProfile(studentId);
    }

    @Transactional
    public SkillDTO addSkill(Long studentId, AddSkillRequest request) {
        StudentProfile profile = studentProfileRepository.findById(studentId)
                .orElseThrow(() -> new ResourceNotFoundException("Student", "id", studentId));

        StudentSkill skill = new StudentSkill();
        skill.setStudent(profile);
        skill.setSkillName(request.getSkillName());
        skill.setProficiencyLevel(request.getProficiencyLevel());

        profile.getSkills().add(skill);
        studentProfileRepository.save(profile);

        return new SkillDTO(skill.getSkillId(), skill.getSkillName(), skill.getProficiencyLevel());
    }

    public StudentDashboardResponse getDashboard(Long studentId) {
        StudentProfile profile = studentProfileRepository.findById(studentId)
                .orElseThrow(() -> new ResourceNotFoundException("Student", "id", studentId));

        User user = profile.getUser();

        // Get statistics
        Long testsCompleted = testAttemptRepository.countByStudentId(studentId);
        BigDecimal averageScore = testAttemptRepository.getAveragePercentageByStudent(studentId);
        if (averageScore == null) averageScore = BigDecimal.ZERO;

        Long badgesEarned = studentBadgeRepository.countByStudentId(studentId);
        Long topicsCompleted = studentTopicProgressRepository.countCompletedTopicsByStudent(studentId);

        // Count pending tests (upcoming or ongoing)
        Long totalTests = testRepository.count();
        Integer pendingTests = (int) (totalTests - testsCompleted);

        StudentDashboardResponse response = new StudentDashboardResponse();
        response.setName(user.getName());
        response.setRollNumber(profile.getRollNumber());
        response.setDepartment(profile.getDepartment());
        response.setCurrentStreak(profile.getCurrentStreak());
        response.setTotalProblemsSolved(profile.getTotalProblemsSolved());
        response.setTestsCompleted(testsCompleted);
        response.setAverageScore(averageScore);
        response.setBadgesEarned(badgesEarned.intValue());
        response.setTopicsCompleted(topicsCompleted.intValue());
        response.setPendingTests(pendingTests);

        return response;
    }

    public Long getCurrentStudentId(Authentication authentication) {
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        User user = userRepository.findByEmail(userPrincipal.getEmail())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return user.getUserId();
    }
}
