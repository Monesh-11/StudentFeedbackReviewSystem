package com.lms.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StaffProfileResponse {
    private Long staffId;
    private String name;
    private String email;
    private String employeeId;
    private String department;
    private String designation;
    private String googleClassroomCode;
    private String profileImageUrl;
    private List<String> subjects;
}
