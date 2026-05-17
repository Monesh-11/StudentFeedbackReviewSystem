package com.lms.service;

import com.lms.dto.response.RoadmapResponse;
import com.lms.dto.response.RoadmapTopicResponse;
import com.lms.dto.response.ResourceResponse;
import com.lms.entity.*;
import com.lms.exception.ResourceNotFoundException;
import com.lms.repository.RoadmapRepository;
import com.lms.repository.RoadmapTopicRepository;
import com.lms.repository.StudentProfileRepository;
import com.lms.repository.StudentTopicProgressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class RoadmapService {

    @Autowired
    private RoadmapRepository roadmapRepository;

    @Autowired
    private RoadmapTopicRepository roadmapTopicRepository;

    @Autowired
    private StudentTopicProgressRepository studentTopicProgressRepository;

    @Autowired
    private StudentProfileRepository studentProfileRepository;

    public List<RoadmapResponse> getAllRoadmaps(Long studentId) {
        List<Roadmap> roadmaps = roadmapRepository.findAll();
        return roadmaps.stream()
                .map(r -> mapToRoadmapResponse(r, studentId, false))
                .collect(Collectors.toList());
    }

    public RoadmapResponse getRoadmapById(Long roadmapId, Long studentId) {
        Roadmap roadmap = roadmapRepository.findByIdWithTopics(roadmapId)
                .orElseThrow(() -> new ResourceNotFoundException("Roadmap", "id", roadmapId));
        return mapToRoadmapResponse(roadmap, studentId, true);
    }

    @Transactional
    public RoadmapTopicResponse markTopicComplete(Long topicId, Long studentId) {
        StudentProfile student = studentProfileRepository.findById(studentId)
                .orElseThrow(() -> new ResourceNotFoundException("Student", "id", studentId));

        RoadmapTopic topic = roadmapTopicRepository.findById(topicId)
                .orElseThrow(() -> new ResourceNotFoundException("Topic", "id", topicId));

        StudentTopicProgress progress = studentTopicProgressRepository
                .findByStudentStudentIdAndTopicTopicId(studentId, topicId)
                .orElse(new StudentTopicProgress());

        progress.setStudent(student);
        progress.setTopic(topic);
        progress.setIsCompleted(true);
        progress.setCompletedAt(LocalDateTime.now());

        studentTopicProgressRepository.save(progress);

        return mapToTopicResponse(topic, progress);
    }

    private RoadmapResponse mapToRoadmapResponse(Roadmap roadmap, Long studentId, boolean includeTopics) {
        RoadmapResponse response = new RoadmapResponse();
        response.setRoadmapId(roadmap.getRoadmapId());
        response.setTitle(roadmap.getTitle());
        response.setDescription(roadmap.getDescription());
        response.setCategory(roadmap.getCategory());

        int totalTopics = roadmap.getTopics().size();
        response.setTotalTopics(totalTopics);

        // Get student progress
        Map<Long, StudentTopicProgress> progressMap = studentTopicProgressRepository
                .findByStudentStudentId(studentId).stream()
                .collect(Collectors.toMap(p -> p.getTopic().getTopicId(), p -> p));

        int completedCount = (int) roadmap.getTopics().stream()
                .filter(t -> progressMap.containsKey(t.getTopicId()) && progressMap.get(t.getTopicId()).getIsCompleted())
                .count();

        response.setCompletedTopics(completedCount);
        response.setCompletionPercentage(totalTopics > 0 ? (completedCount * 100.0 / totalTopics) : 0.0);

        if (includeTopics) {
            List<RoadmapTopicResponse> topics = roadmap.getTopics().stream()
                    .map(t -> mapToTopicResponse(t, progressMap.get(t.getTopicId())))
                    .collect(Collectors.toList());
            response.setTopics(topics);
        }

        return response;
    }

    private RoadmapTopicResponse mapToTopicResponse(RoadmapTopic topic, StudentTopicProgress progress) {
        RoadmapTopicResponse response = new RoadmapTopicResponse();
        response.setTopicId(topic.getTopicId());
        response.setTopicName(topic.getTopicName());
        response.setDescription(topic.getDescription());
        response.setTopicOrder(topic.getTopicOrder());
        response.setIsCompleted(progress != null && progress.getIsCompleted());
        response.setCompletedAt(progress != null ? progress.getCompletedAt() : null);

        List<ResourceResponse> resources = topic.getResources().stream()
                .map(r -> new ResourceResponse(r.getResourceId(), r.getResourceTitle(), 
                        r.getResourceUrl(), r.getResourceType().name()))
                .collect(Collectors.toList());
        response.setResources(resources);

        return response;
    }
}
