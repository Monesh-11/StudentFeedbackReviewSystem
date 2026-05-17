package com.lms.repository;

import com.lms.entity.StaffProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StaffProfileRepository extends JpaRepository<StaffProfile, Long> {
    
    Optional<StaffProfile> findByEmployeeId(String employeeId);
    
    List<StaffProfile> findByDepartment(String department);
}
