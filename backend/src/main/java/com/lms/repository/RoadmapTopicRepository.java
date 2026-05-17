package com.lms.repository;

import com.lms.entity.RoadmapTopic;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoadmapTopicRepository extends JpaRepository<RoadmapTopic, Long> {
}
