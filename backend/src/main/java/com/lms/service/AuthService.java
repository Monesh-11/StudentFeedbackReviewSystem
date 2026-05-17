package com.lms.service;

import com.lms.dto.request.LoginRequest;
import com.lms.dto.request.RegisterRequest;
import com.lms.dto.response.AuthResponse;
import com.lms.entity.StaffProfile;
import com.lms.entity.StudentProfile;
import com.lms.entity.User;
import com.lms.exception.BadRequestException;
import com.lms.repository.StaffProfileRepository;
import com.lms.repository.StudentProfileRepository;
import com.lms.repository.UserRepository;
import com.lms.security.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
public class AuthService {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private StudentProfileRepository studentProfileRepository;

    @Autowired
    private StaffProfileRepository staffProfileRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtTokenProvider tokenProvider;

    public AuthResponse login(LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getEmail(),
                        loginRequest.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = tokenProvider.generateToken(authentication);

        User user = userRepository.findByEmail(loginRequest.getEmail())
                .orElseThrow(() -> new BadRequestException("User not found"));

        // Update last login
        user.setLastLogin(LocalDateTime.now());
        userRepository.save(user);

        return new AuthResponse(jwt, user.getUserId(), user.getName(), user.getEmail(), user.getRole());
    }

    @Transactional
    public AuthResponse register(RegisterRequest registerRequest) {
        // Check if email already exists
        if (userRepository.existsByEmail(registerRequest.getEmail())) {
            throw new BadRequestException("Email is already registered");
        }

        // Create user
        User user = new User();
        user.setName(registerRequest.getName());
        user.setEmail(registerRequest.getEmail());
        user.setPasswordHash(passwordEncoder.encode(registerRequest.getPassword()));
        user.setRole(registerRequest.getRole());
        user.setStatus(User.UserStatus.ACTIVE);

        User savedUser = userRepository.save(user);

        // Create role-specific profile
        if (registerRequest.getRole() == User.Role.STUDENT) {
            createStudentProfile(savedUser, registerRequest);
        } else if (registerRequest.getRole() == User.Role.STAFF) {
            createStaffProfile(savedUser, registerRequest);
        }

        // Generate JWT token
        String jwt = tokenProvider.generateTokenFromEmail(savedUser.getEmail());

        return new AuthResponse(jwt, savedUser.getUserId(), savedUser.getName(), 
                savedUser.getEmail(), savedUser.getRole());
    }

    private void createStudentProfile(User user, RegisterRequest request) {
        if (request.getRollNumber() == null || request.getDepartment() == null) {
            throw new BadRequestException("Roll number and department are required for student registration");
        }

        StudentProfile studentProfile = new StudentProfile();
        studentProfile.setUser(user);
        studentProfile.setRollNumber(request.getRollNumber());
        studentProfile.setDepartment(request.getDepartment());
        studentProfile.setYear(request.getYear());
        studentProfile.setSemester(request.getSemester());

        studentProfileRepository.save(studentProfile);
    }

    private void createStaffProfile(User user, RegisterRequest request) {
        if (request.getEmployeeId() == null || request.getDepartment() == null || request.getDesignation() == null) {
            throw new BadRequestException("Employee ID, department, and designation are required for staff registration");
        }

        StaffProfile staffProfile = new StaffProfile();
        staffProfile.setUser(user);
        staffProfile.setEmployeeId(request.getEmployeeId());
        staffProfile.setDepartment(request.getDepartment());
        staffProfile.setDesignation(request.getDesignation());

        staffProfileRepository.save(staffProfile);
    }
}
