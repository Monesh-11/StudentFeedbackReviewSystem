package com.lms.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RoadmapTopicResponse {
    private Long topicId;
    private String topicName;
    private String description;
    private Integer topicOrder;
    private Boolean isCompleted;
    private LocalDateTime completedAt;
    private List<ResourceResponse> resources;
}
