package com.lms.repository;

import com.lms.entity.Test;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TestRepository extends JpaRepository<Test, Long> {
    
    List<Test> findByCreatedByStaffId(Long staffId);
    
    List<Test> findByStatus(Test.TestStatus status);
    
    List<Test> findBySubject(String subject);
    
    @Query("SELECT t FROM Test t LEFT JOIN FETCH t.questions WHERE t.testId = :testId")
    Test findByIdWithQuestions(Long testId);
    
    @Query("SELECT COUNT(t) FROM Test t WHERE t.createdBy.staffId = :staffId")
    Long countByStaffId(Long staffId);
}
