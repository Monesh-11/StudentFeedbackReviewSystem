package com.lms.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StudentDashboardResponse {
    private String name;
    private String rollNumber;
    private String department;
    private Integer currentStreak;
    private Integer totalProblemsSolved;
    
    // Test statistics
    private Long testsCompleted;
    private BigDecimal averageScore;
    private Integer badgesEarned;
    
    // Recent activity
    private Integer topicsCompleted;
    private Integer pendingTests;
}
