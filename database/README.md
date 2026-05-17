# Database Schema Documentation

## Student Feedback & Learning Management System - PostgreSQL Schema

### Overview
This database schema supports a comprehensive learning management system with role-based access, feedback management, testing, gamification, and learning roadmaps.

---

## 📊 Database Statistics

- **Total Tables**: 20+
- **Total Views**: 3
- **Total Indexes**: 25+
- **Total Triggers**: 8

---

## 🗂️ Table Categories

### 1. Users & Authentication (2 tables)
- `users` - Main user accounts with roles
- Role types: student, staff, admin

### 2. Profiles (4 tables)
- `student_profiles` - Student-specific information
- `student_skills` - Student skill tracking
- `staff_profiles` - Staff-specific information
- `staff_subjects` - Subjects taught by staff

### 3. Feedback System (3 tables)
- `feedback_categories` - Feedback categories
- `feedback` - Anonymous feedback with tracing

### 4. Tests & Assessments (4 tables)
- `tests` - Test configuration
- `questions` - Test questions with options
- `test_attempts` - Student test submissions
- `student_answers` - Individual question answers

### 5. Learning Roadmaps (4 tables)
- `roadmaps` - Learning path definitions
- `roadmap_topics` - Topics within roadmaps
- `topic_resources` - External learning resources
- `student_topic_progress` - Student progress tracking

### 6. Gamification (2 tables)
- `badges` - Achievement badges
- `student_badges` - Student badge earnings

### 7. Coding Practice (2 tables)
- `coding_problems` - Programming challenges
- `student_submissions` - Code submissions

---

## 🔑 Key Relationships

### User Relationships
```
users (1) ──→ (1) student_profiles
users (1) ──→ (1) staff_profiles
```

### Student Relationships
```
student_profiles (1) ──→ (N) student_skills
student_profiles (1) ──→ (N) feedback
student_profiles (1) ──→ (N) test_attempts
student_profiles (1) ──→ (N) student_badges
student_profiles (1) ──→ (N) student_topic_progress
student_profiles (1) ──→ (N) student_submissions
```

### Test Relationships
```
tests (1) ──→ (N) questions
tests (1) ──→ (N) test_attempts
test_attempts (1) ──→ (N) student_answers
staff_profiles (1) ──→ (N) tests
```

### Roadmap Relationships
```
roadmaps (1) ──→ (N) roadmap_topics
roadmap_topics (1) ──→ (N) topic_resources
roadmap_topics (1) ──→ (N) student_topic_progress
```

---

## 📋 Table Details

### users
**Purpose**: Main authentication and user management

| Column | Type | Constraints |
|--------|------|-------------|
| user_id | SERIAL | PRIMARY KEY |
| email | VARCHAR(255) | UNIQUE, NOT NULL |
| password_hash | VARCHAR(255) | NOT NULL |
| role | VARCHAR(20) | CHECK (student/staff/admin) |
| name | VARCHAR(255) | NOT NULL |
| status | VARCHAR(20) | CHECK (active/inactive/suspended) |

**Indexes**: email, role

---

### student_profiles
**Purpose**: Extended student information

| Column | Type | Constraints |
|--------|------|-------------|
| student_id | INTEGER | PRIMARY KEY, FK → users |
| roll_number | VARCHAR(50) | UNIQUE, NOT NULL |
| department | VARCHAR(100) | NOT NULL |
| year | INTEGER | CHECK (1-4) |
| semester | INTEGER | CHECK (1-8) |
| resume_url | VARCHAR(500) | |
| github_url | VARCHAR(255) | |
| linkedin_url | VARCHAR(255) | |
| current_streak | INTEGER | DEFAULT 0 |

**Indexes**: roll_number, department

---

### feedback
**Purpose**: Anonymous feedback system with admin tracing

| Column | Type | Constraints |
|--------|------|-------------|
| feedback_id | SERIAL | PRIMARY KEY |
| student_id | INTEGER | FK → student_profiles |
| category_id | INTEGER | FK → feedback_categories |
| rating | INTEGER | CHECK (1-5) |
| message | TEXT | NOT NULL |
| is_anonymous | BOOLEAN | DEFAULT true |
| status | VARCHAR(20) | CHECK (pending/reviewed/resolved) |

**Key Feature**: Admin can trace anonymous feedback via student_id

**Indexes**: student_id, category_id, status, created_at

---

### tests
**Purpose**: Test configuration and scheduling

| Column | Type | Constraints |
|--------|------|-------------|
| test_id | SERIAL | PRIMARY KEY |
| title | VARCHAR(255) | NOT NULL |
| subject | VARCHAR(100) | NOT NULL |
| created_by | INTEGER | FK → staff_profiles |
| duration_minutes | INTEGER | NOT NULL |
| total_marks | INTEGER | NOT NULL |
| scheduled_date | TIMESTAMP | NOT NULL |
| status | VARCHAR(20) | CHECK (upcoming/ongoing/completed) |

**Indexes**: created_by, status, scheduled_date

---

### test_attempts
**Purpose**: Student test submissions and results

| Column | Type | Constraints |
|--------|------|-------------|
| attempt_id | SERIAL | PRIMARY KEY |
| test_id | INTEGER | FK → tests |
| student_id | INTEGER | FK → student_profiles |
| score | DECIMAL(5,2) | NOT NULL |
| percentage | DECIMAL(5,2) | NOT NULL |
| correct_answers | INTEGER | NOT NULL |
| wrong_answers | INTEGER | NOT NULL |
| time_taken_minutes | INTEGER | NOT NULL |
| rank | INTEGER | |

**Unique Constraint**: (test_id, student_id) - One attempt per test

**Indexes**: test_id, student_id, score

---

### roadmaps & roadmap_topics
**Purpose**: Learning path management

**roadmaps**:
- title, category, description

**roadmap_topics**:
- topic_name, topic_order, description
- Ordered list of topics per roadmap

**Default Roadmaps**:
1. Data Structures & Algorithms
2. Database Management Systems
3. Operating Systems
4. Programming Languages

---

### badges & student_badges
**Purpose**: Gamification and achievements

**badges**:
- badge_name, description, icon, color, criteria

**student_badges**:
- Maps students to earned badges
- Tracks earned_at timestamp

**Default Badges**:
1. First Steps (Complete first test)
2. Quick Learner (90%+ in 3 tests)
3. Code Master (50 problems solved)
4. Perfect Score (100% in any test)
5. Feedback Champion (10+ feedbacks)

---

## 🎯 Views

### student_dashboard_stats
Aggregates student performance metrics:
- Tests completed
- Average score
- Badges earned
- Current streak
- Problems solved

### staff_analytics
Aggregates teaching metrics:
- Tests created
- Feedback received
- Average rating

### admin_system_stats
System-wide statistics:
- Total students/staff
- Total tests/feedback
- Pending feedback count
- Average rating

---

## ⚡ Triggers

### update_updated_at_column
Automatically updates `updated_at` timestamp on record modification

Applied to tables:
- users
- student_profiles
- staff_profiles
- tests
- roadmaps
- student_skills
- student_topic_progress
- coding_problems

---

## 🔒 Security Features

1. **Password Hashing**: password_hash column for bcrypt/argon2
2. **Role-based Access**: CHECK constraints on role column
3. **Anonymous Feedback**: is_anonymous flag with student_id for tracing
4. **Cascade Deletes**: ON DELETE CASCADE for data integrity
5. **Status Tracking**: Status columns with CHECK constraints

---

## 📈 Performance Optimizations

1. **Indexes on Foreign Keys**: All FK columns indexed
2. **Composite Indexes**: For common query patterns
3. **Partial Indexes**: On status columns
4. **Materialized Views**: Can be added for heavy analytics

---

## 🔄 Sample Queries

### Get Student Dashboard Data
```sql
SELECT * FROM student_dashboard_stats WHERE student_id = 1;
```

### Get All Pending Feedback
```sql
SELECT f.*, fc.category_name, u.name as student_name
FROM feedback f
JOIN feedback_categories fc ON f.category_id = fc.category_id
JOIN student_profiles sp ON f.student_id = sp.student_id
JOIN users u ON sp.student_id = u.user_id
WHERE f.status = 'pending'
ORDER BY f.created_at DESC;
```

### Get Student Roadmap Progress
```sql
SELECT r.title, rt.topic_name, stp.is_completed
FROM roadmaps r
JOIN roadmap_topics rt ON r.roadmap_id = rt.roadmap_id
LEFT JOIN student_topic_progress stp ON rt.topic_id = stp.topic_id 
    AND stp.student_id = 1
ORDER BY r.roadmap_id, rt.topic_order;
```

### Get Test Results with Rank
```sql
SELECT ta.*, u.name, 
    RANK() OVER (PARTITION BY ta.test_id ORDER BY ta.score DESC) as rank
FROM test_attempts ta
JOIN student_profiles sp ON ta.student_id = sp.student_id
JOIN users u ON sp.student_id = u.user_id
WHERE ta.test_id = 1;
```

---

## 🚀 Setup Instructions

1. **Create Database**:
```bash
createdb student_feedback_lms
```

2. **Run Schema**:
```bash
psql -d student_feedback_lms -f schema.sql
```

3. **Verify Tables**:
```sql
\dt
```

4. **Check Constraints**:
```sql
\d users
```

---

## 📝 Notes

- All timestamps use `TIMESTAMP` type
- Serial IDs start from 1
- Foreign keys use CASCADE delete for data integrity
- Sample data included for testing
- Ready for Spring Boot JPA integration

---

**Schema Version**: 1.0  
**Last Updated**: 2026-02-01  
**Compatible with**: PostgreSQL 12+
