package com.lms.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResourceResponse {
    private Long resourceId;
    private String resourceTitle;
    private String resourceUrl;
    private String resourceType;
}
