package com.lms.repository;

import com.lms.entity.StudentBadge;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudentBadgeRepository extends JpaRepository<StudentBadge, Long> {
    
    List<StudentBadge> findByStudentStudentId(Long studentId);
    
    boolean existsByStudentStudentIdAndBadgeBadgeId(Long studentId, Long badgeId);
    
    @Query("SELECT COUNT(sb) FROM StudentBadge sb WHERE sb.student.studentId = :studentId")
    Long countByStudentId(Long studentId);
}
