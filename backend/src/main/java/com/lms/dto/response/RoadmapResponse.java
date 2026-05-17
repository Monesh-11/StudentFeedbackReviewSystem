package com.lms.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RoadmapResponse {
    private Long roadmapId;
    private String title;
    private String description;
    private String category;
    private Integer totalTopics;
    private Integer completedTopics;
    private Double completionPercentage;
    private List<RoadmapTopicResponse> topics;
}
