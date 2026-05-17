package com.lms.repository;

import com.lms.entity.StudentTopicProgress;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StudentTopicProgressRepository extends JpaRepository<StudentTopicProgress, Long> {
    
    List<StudentTopicProgress> findByStudentStudentId(Long studentId);
    
    Optional<StudentTopicProgress> findByStudentStudentIdAndTopicTopicId(Long studentId, Long topicId);
    
    @Query("SELECT COUNT(stp) FROM StudentTopicProgress stp WHERE stp.student.studentId = :studentId AND stp.isCompleted = true")
    Long countCompletedTopicsByStudent(Long studentId);
}
