package com.lms.repository;

import com.lms.entity.StudentProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StudentProfileRepository extends JpaRepository<StudentProfile, Long> {
    
    Optional<StudentProfile> findByRollNumber(String rollNumber);
    
    List<StudentProfile> findByDepartment(String department);
    
    List<StudentProfile> findByYear(Integer year);
    
    @Query("SELECT sp FROM StudentProfile sp LEFT JOIN FETCH sp.skills WHERE sp.studentId = :studentId")
    Optional<StudentProfile> findByIdWithSkills(Long studentId);
    
    @Query("SELECT sp FROM StudentProfile sp LEFT JOIN FETCH sp.badges WHERE sp.studentId = :studentId")
    Optional<StudentProfile> findByIdWithBadges(Long studentId);
}
