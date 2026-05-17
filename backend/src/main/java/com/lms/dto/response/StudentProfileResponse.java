package com.lms.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StudentProfileResponse {
    private Long studentId;
    private String name;
    private String email;
    private String rollNumber;
    private String department;
    private Integer year;
    private Integer semester;
    private String profileImageUrl;
    private String resumeUrl;
    private String githubUrl;
    private String linkedinUrl;
    private String portfolioUrl;
    private Integer currentStreak;
    private Integer totalProblemsSolved;
    private List<SkillDTO> skills;
}
