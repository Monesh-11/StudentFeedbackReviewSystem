package com.lms.repository;

import com.lms.entity.Roadmap;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RoadmapRepository extends JpaRepository<Roadmap, Long> {
    
    List<Roadmap> findByCategory(String category);
    
    @Query("SELECT r FROM Roadmap r LEFT JOIN FETCH r.topics WHERE r.roadmapId = :roadmapId")
    Optional<Roadmap> findByIdWithTopics(Long roadmapId);
}
