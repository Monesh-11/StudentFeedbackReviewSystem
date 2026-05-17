package com.lms.repository;

import com.lms.entity.Feedback;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FeedbackRepository extends JpaRepository<Feedback, Long> {
    
    List<Feedback> findByStatus(Feedback.FeedbackStatus status);
    
    List<Feedback> findByStudentStudentId(Long studentId);
    
    List<Feedback> findByCategoryCategoryId(Long categoryId);
    
    List<Feedback> findByIsAnonymous(Boolean isAnonymous);
    
    Page<Feedback> findByStatusOrderByCreatedAtDesc(Feedback.FeedbackStatus status, Pageable pageable);
    
    Page<Feedback> findAllByOrderByCreatedAtDesc(Pageable pageable);
    
    @Query("SELECT AVG(f.rating) FROM Feedback f")
    Double getAverageRating();
    
    @Query("SELECT COUNT(f) FROM Feedback f WHERE f.status = 'PENDING'")
    Long countPendingFeedback();
}
