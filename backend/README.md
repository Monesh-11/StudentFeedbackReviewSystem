# Spring Boot Backend - Student Feedback & Learning Management System

## 📦 Project Structure

```
backend/
├── src/main/java/com/lms/
│   ├── StudentFeedbackLmsApplication.java  # Main application
│   ├── entity/                             # JPA Entities (20+)
│   │   ├── User.java
│   │   ├── StudentProfile.java
│   │   ├── StaffProfile.java
│   │   ├── Feedback.java
│   │   ├── Test.java
│   │   ├── Question.java
│   │   ├── TestAttempt.java
│   │   ├── StudentAnswer.java
│   │   ├── Roadmap.java
│   │   ├── RoadmapTopic.java
│   │   ├── TopicResource.java
│   │   ├── StudentTopicProgress.java
│   │   ├── Badge.java
│   │   ├── StudentBadge.java
│   │   ├── CodingProblem.java
│   │   ├── StudentSubmission.java
│   │   ├── StudentSkill.java
│   │   ├── StaffSubject.java
│   │   └── FeedbackCategory.java
│   ├── repository/                         # Data Access Layer (10+)
│   │   ├── UserRepository.java
│   │   ├── StudentProfileRepository.java
│   │   ├── StaffProfileRepository.java
│   │   ├── FeedbackRepository.java
│   │   ├── TestRepository.java
│   │   ├── TestAttemptRepository.java
│   │   ├── RoadmapRepository.java
│   │   ├── StudentTopicProgressRepository.java
│   │   ├── BadgeRepository.java
│   │   └── StudentBadgeRepository.java
│   ├── config/                             # Configuration
│   │   ├── AppConfig.java
│   │   └── CorsConfig.java
│   └── exception/                          # Exception Handling
│       ├── ResourceNotFoundException.java
│       ├── BadRequestException.java
│       ├── UnauthorizedException.java
│       └── GlobalExceptionHandler.java
├── src/main/resources/
│   └── application.yml                     # Application configuration
└── pom.xml                                 # Maven dependencies
```

## 🚀 Technologies Used

- **Spring Boot 3.2.2** - Framework
- **Spring Data JPA** - Database operations
- **Spring Security** - Authentication & authorization
- **PostgreSQL** - Database
- **JWT (jjwt 0.12.3)** - Token-based authentication
- **Lombok** - Reduce boilerplate code
- **ModelMapper** - DTO mapping
- **Maven** - Build tool

## 📊 Entities Created (20+)

### Core Entities
- `User` - Authentication with role-based access (STUDENT/STAFF/ADMIN)
- `StudentProfile` - Student information
- `StaffProfile` - Staff information

### Profile Extensions
- `StudentSkill` - Student skills with proficiency levels
- `StaffSubject` - Subjects taught by staff

### Feedback System
- `FeedbackCategory` - Feedback categories
- `Feedback` - Anonymous feedback with admin tracing

### Testing System
- `Test` - Test configuration
- `Question` - MCQ questions
- `TestAttempt` - Student test submissions
- `StudentAnswer` - Individual answers

### Learning Paths
- `Roadmap` - Learning roadmaps
- `RoadmapTopic` - Topics within roadmaps
- `TopicResource` - External resources
- `StudentTopicProgress` - Progress tracking

### Gamification
- `Badge` - Achievement definitions
- `StudentBadge` - Earned badges

### Coding Practice
- `CodingProblem` - Programming challenges
- `StudentSubmission` - Code submissions

## 🔧 Configuration

### Database (application.yml)
```yaml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/student_feedback_lms
    username: lms_app
    password: your_secure_password
  jpa:
    hibernate:
      ddl-auto: validate
```

### CORS
Configured for React frontend:
- Allowed origins: `http://localhost:5173`, `http://localhost:3000`
- Allowed methods: GET, POST, PUT, DELETE, OPTIONS

### JWT
- Secret key configuration
- 24-hour token expiration
- 7-day refresh token

## 📝 Repository Features

### Custom Query Methods
- Find by email, role, status
- Fetch with relationships (JOIN FETCH)
- Aggregation queries (COUNT, AVG)
- Ordering and filtering

### Example Queries
```java
// UserRepository
Optional<User> findByEmail(String email);
List<User> findByRole(User.Role role);

// FeedbackRepository
List<Feedback> findByStatusOrderByCreatedAtDesc(FeedbackStatus status);
Double getAverageRating();

// TestAttemptRepository
BigDecimal getAveragePercentageByStudent(Long studentId);
```

## 🛡️ Exception Handling

### Custom Exceptions
- `ResourceNotFoundException` - 404 errors
- `BadRequestException` - 400 errors
- `UnauthorizedException` - 401 errors

### Global Handler
- Centralized exception handling
- Proper HTTP status codes
- Validation error mapping
- Consistent error response format

## 🏗️ Next Steps

### 1. Create DTOs
```
dto/
├── request/
│   ├── LoginRequest.java
│   ├── RegisterRequest.java
│   ├── FeedbackRequest.java
│   └── TestRequest.java
└── response/
    ├── UserResponse.java
    ├── StudentDashboardResponse.java
    └── TestResultResponse.java
```

### 2. Implement Services
```
service/
├── AuthService.java
├── StudentService.java
├── StaffService.java
├── AdminService.java
├── FeedbackService.java
└── TestService.java
```

### 3. Create Controllers
```
controller/
├── AuthController.java
├── StudentController.java
├── StaffController.java
├── AdminController.java
├── FeedbackController.java
└── TestController.java
```

### 4. Add Security
```
security/
├── JwtTokenProvider.java
├── JwtAuthenticationFilter.java
├── SecurityConfig.java
└── UserDetailsServiceImpl.java
```

## 🔄 Integration with Frontend

The backend is designed to work seamlessly with the React frontend:
- CORS configured for `localhost:5173`
- REST API endpoints at `/api/*`
- JWT authentication matching frontend expectations
- DTOs will match frontend data structures

## 📦 Maven Commands

```bash
# Build project
mvn clean install

# Run application
mvn spring-boot:run

# Run tests
mvn test

# Package as JAR
mvn package
```

## 🗄️ Database Setup

1. Create PostgreSQL database:
```sql
CREATE DATABASE student_feedback_lms;
```

2. Run schema from `/database/schema.sql`

3. Update `application.yml` with credentials

## ✅ Current Status

**Completed:**
- ✅ Project structure
- ✅ Maven configuration (pom.xml)
- ✅ Application configuration (application.yml)
- ✅ 20+ JPA entities with relationships
- ✅ 10+ Repository interfaces
- ✅ Configuration classes
- ✅ Exception handling
- ✅ CORS configuration

**Next:**
- ⬜ DTOs (Request/Response)
- ⬜ Service layer
- ⬜ Controllers
- ⬜ JWT Security
- ⬜ Testing

## 📚 Key Features

- **Layered Architecture** - Controller → Service → Repository
- **JPA Auditing** - Automatic created_at/updated_at
- **Relationship Mapping** - OneToOne, OneToMany, ManyToOne
- **Custom Queries** - JPQL and method name queries
- **Exception Handling** - Global error handling
- **DTO Pattern** - Separation of concerns
- **Security Ready** - JWT authentication structure

---

**Version**: 1.0.0  
**Java**: 17  
**Spring Boot**: 3.2.2  
**Status**: Foundation Complete ✅
