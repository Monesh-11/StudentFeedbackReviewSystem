package com.lms.repository;

import com.lms.entity.TestAttempt;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Repository
public interface TestAttemptRepository extends JpaRepository<TestAttempt, Long> {
    
    List<TestAttempt> findByStudentStudentId(Long studentId);
    
    List<TestAttempt> findByTestTestId(Long testId);
    
    Optional<TestAttempt> findByTestTestIdAndStudentStudentId(Long testId, Long studentId);
    
    @Query("SELECT ta FROM TestAttempt ta WHERE ta.test.testId = :testId ORDER BY ta.score DESC")
    List<TestAttempt> findByTestIdOrderByScoreDesc(Long testId);
    
    @Query("SELECT AVG(ta.percentage) FROM TestAttempt ta WHERE ta.student.studentId = :studentId")
    BigDecimal getAveragePercentageByStudent(Long studentId);
    
    @Query("SELECT COUNT(ta) FROM TestAttempt ta WHERE ta.student.studentId = :studentId")
    Long countByStudentId(Long studentId);
}
