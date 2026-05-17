package com.lms.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BadgeResponse {
    private Long badgeId;
    private String badgeName;
    private String description;
    private String icon;
    private String color;
    private String criteria;
    private LocalDateTime earnedAt;
}
