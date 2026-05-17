-- =====================================================
-- Student Feedback & Learning Management System
-- PostgreSQL Database Schema
-- =====================================================

-- =====================================================
-- USERS & AUTHENTICATION
-- =====================================================

-- Main users table with role-based access
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL CHECK (role IN ('student', 'staff', 'admin')),
    name VARCHAR(255) NOT NULL,
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'suspended')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);

-- =====================================================
-- STUDENT PROFILES
-- =====================================================

CREATE TABLE student_profiles (
    student_id INTEGER PRIMARY KEY REFERENCES users(user_id) ON DELETE CASCADE,
    roll_number VARCHAR(50) UNIQUE NOT NULL,
    department VARCHAR(100) NOT NULL,
    year INTEGER CHECK (year BETWEEN 1 AND 4),
    semester INTEGER CHECK (semester BETWEEN 1 AND 8),
    profile_image_url VARCHAR(500),
    resume_url VARCHAR(500),
    github_url VARCHAR(255),
    linkedin_url VARCHAR(255),
    portfolio_url VARCHAR(255),
    current_streak INTEGER DEFAULT 0,
    total_problems_solved INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_student_roll_number ON student_profiles(roll_number);
CREATE INDEX idx_student_department ON student_profiles(department);

-- Student skills tracking
CREATE TABLE student_skills (
    skill_id SERIAL PRIMARY KEY,
    student_id INTEGER NOT NULL REFERENCES student_profiles(student_id) ON DELETE CASCADE,
    skill_name VARCHAR(100) NOT NULL,
    proficiency_level INTEGER CHECK (proficiency_level BETWEEN 0 AND 100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(student_id, skill_name)
);

CREATE INDEX idx_student_skills_student ON student_skills(student_id);

-- =====================================================
-- STAFF PROFILES
-- =====================================================

CREATE TABLE staff_profiles (
    staff_id INTEGER PRIMARY KEY REFERENCES users(user_id) ON DELETE CASCADE,
    employee_id VARCHAR(50) UNIQUE NOT NULL,
    department VARCHAR(100) NOT NULL,
    designation VARCHAR(100) NOT NULL,
    google_classroom_code VARCHAR(50),
    profile_image_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_staff_employee_id ON staff_profiles(employee_id);
CREATE INDEX idx_staff_department ON staff_profiles(department);

-- Subjects taught by staff
CREATE TABLE staff_subjects (
    subject_id SERIAL PRIMARY KEY,
    staff_id INTEGER NOT NULL REFERENCES staff_profiles(staff_id) ON DELETE CASCADE,
    subject_name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(staff_id, subject_name)
);

CREATE INDEX idx_staff_subjects_staff ON staff_subjects(staff_id);

-- =====================================================
-- FEEDBACK SYSTEM
-- =====================================================

CREATE TABLE feedback_categories (
    category_id SERIAL PRIMARY KEY,
    category_name VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default categories
INSERT INTO feedback_categories (category_name) VALUES
    ('Course Content'),
    ('Teaching Quality'),
    ('Infrastructure'),
    ('Lab Facilities'),
    ('Library'),
    ('Administration'),
    ('Other');

CREATE TABLE feedback (
    feedback_id SERIAL PRIMARY KEY,
    student_id INTEGER NOT NULL REFERENCES student_profiles(student_id) ON DELETE CASCADE,
    category_id INTEGER NOT NULL REFERENCES feedback_categories(category_id),
    rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
    message TEXT NOT NULL,
    is_anonymous BOOLEAN DEFAULT true,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'resolved')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    reviewed_at TIMESTAMP,
    reviewed_by INTEGER REFERENCES users(user_id)
);

CREATE INDEX idx_feedback_student ON feedback(student_id);
CREATE INDEX idx_feedback_category ON feedback(category_id);
CREATE INDEX idx_feedback_status ON feedback(status);
CREATE INDEX idx_feedback_created ON feedback(created_at DESC);

-- =====================================================
-- TESTS & ASSESSMENTS
-- =====================================================

CREATE TABLE tests (
    test_id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    subject VARCHAR(100) NOT NULL,
    created_by INTEGER NOT NULL REFERENCES staff_profiles(staff_id),
    duration_minutes INTEGER NOT NULL,
    total_marks INTEGER NOT NULL,
    total_questions INTEGER NOT NULL,
    scheduled_date TIMESTAMP NOT NULL,
    status VARCHAR(20) DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'ongoing', 'completed', 'cancelled')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_tests_created_by ON tests(created_by);
CREATE INDEX idx_tests_status ON tests(status);
CREATE INDEX idx_tests_scheduled ON tests(scheduled_date);

CREATE TABLE questions (
    question_id SERIAL PRIMARY KEY,
    test_id INTEGER NOT NULL REFERENCES tests(test_id) ON DELETE CASCADE,
    question_text TEXT NOT NULL,
    option_a VARCHAR(500) NOT NULL,
    option_b VARCHAR(500) NOT NULL,
    option_c VARCHAR(500) NOT NULL,
    option_d VARCHAR(500) NOT NULL,
    correct_answer CHAR(1) NOT NULL CHECK (correct_answer IN ('A', 'B', 'C', 'D')),
    marks INTEGER NOT NULL,
    question_order INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(test_id, question_order)
);

CREATE INDEX idx_questions_test ON questions(test_id);

-- =====================================================
-- TEST RESULTS
-- =====================================================

CREATE TABLE test_attempts (
    attempt_id SERIAL PRIMARY KEY,
    test_id INTEGER NOT NULL REFERENCES tests(test_id) ON DELETE CASCADE,
    student_id INTEGER NOT NULL REFERENCES student_profiles(student_id) ON DELETE CASCADE,
    score DECIMAL(5,2) NOT NULL,
    total_marks INTEGER NOT NULL,
    percentage DECIMAL(5,2) NOT NULL,
    correct_answers INTEGER NOT NULL,
    wrong_answers INTEGER NOT NULL,
    unattempted INTEGER NOT NULL,
    time_taken_minutes INTEGER NOT NULL,
    rank INTEGER,
    started_at TIMESTAMP NOT NULL,
    submitted_at TIMESTAMP NOT NULL,
    UNIQUE(test_id, student_id)
);

CREATE INDEX idx_attempts_test ON test_attempts(test_id);
CREATE INDEX idx_attempts_student ON test_attempts(student_id);
CREATE INDEX idx_attempts_score ON test_attempts(score DESC);

-- Student answers for each question
CREATE TABLE student_answers (
    answer_id SERIAL PRIMARY KEY,
    attempt_id INTEGER NOT NULL REFERENCES test_attempts(attempt_id) ON DELETE CASCADE,
    question_id INTEGER NOT NULL REFERENCES questions(question_id) ON DELETE CASCADE,
    selected_answer CHAR(1) CHECK (selected_answer IN ('A', 'B', 'C', 'D')),
    is_correct BOOLEAN NOT NULL,
    marks_obtained DECIMAL(5,2) NOT NULL,
    UNIQUE(attempt_id, question_id)
);

CREATE INDEX idx_answers_attempt ON student_answers(attempt_id);

-- =====================================================
-- LEARNING ROADMAPS
-- =====================================================

CREATE TABLE roadmaps (
    roadmap_id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default roadmaps
INSERT INTO roadmaps (title, category) VALUES
    ('Data Structures & Algorithms', 'dsa'),
    ('Database Management Systems', 'dbms'),
    ('Operating Systems', 'os'),
    ('Programming Languages', 'languages');

CREATE TABLE roadmap_topics (
    topic_id SERIAL PRIMARY KEY,
    roadmap_id INTEGER NOT NULL REFERENCES roadmaps(roadmap_id) ON DELETE CASCADE,
    topic_name VARCHAR(255) NOT NULL,
    topic_order INTEGER NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(roadmap_id, topic_order)
);

CREATE INDEX idx_roadmap_topics_roadmap ON roadmap_topics(roadmap_id);

-- Resources for each topic
CREATE TABLE topic_resources (
    resource_id SERIAL PRIMARY KEY,
    topic_id INTEGER NOT NULL REFERENCES roadmap_topics(topic_id) ON DELETE CASCADE,
    resource_title VARCHAR(255) NOT NULL,
    resource_url VARCHAR(500) NOT NULL,
    resource_type VARCHAR(50) CHECK (resource_type IN ('article', 'video', 'tutorial', 'practice')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_resources_topic ON topic_resources(topic_id);

-- Student progress on roadmap topics
CREATE TABLE student_topic_progress (
    progress_id SERIAL PRIMARY KEY,
    student_id INTEGER NOT NULL REFERENCES student_profiles(student_id) ON DELETE CASCADE,
    topic_id INTEGER NOT NULL REFERENCES roadmap_topics(topic_id) ON DELETE CASCADE,
    is_completed BOOLEAN DEFAULT false,
    completed_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(student_id, topic_id)
);

CREATE INDEX idx_progress_student ON student_topic_progress(student_id);
CREATE INDEX idx_progress_topic ON student_topic_progress(topic_id);

-- =====================================================
-- GAMIFICATION - BADGES
-- =====================================================

CREATE TABLE badges (
    badge_id SERIAL PRIMARY KEY,
    badge_name VARCHAR(100) UNIQUE NOT NULL,
    description TEXT NOT NULL,
    icon VARCHAR(50) NOT NULL,
    color VARCHAR(50) NOT NULL,
    criteria TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default badges
INSERT INTO badges (badge_name, description, icon, color, criteria) VALUES
    ('First Steps', 'Completed your first test', '🎯', '#4facfe', 'Complete 1 test'),
    ('Quick Learner', 'Scored 90+ in 3 consecutive tests', '⚡', '#00f2a9', 'Score 90%+ in 3 consecutive tests'),
    ('Code Master', 'Solved 50 coding problems', '💻', '#667eea', 'Solve 50 coding problems'),
    ('Perfect Score', 'Achieved 100% in any test', '🏆', '#f5576c', 'Score 100% in any test'),
    ('Feedback Champion', 'Submitted 10+ feedbacks', '📝', '#ff9a56', 'Submit 10 feedbacks');

CREATE TABLE student_badges (
    student_badge_id SERIAL PRIMARY KEY,
    student_id INTEGER NOT NULL REFERENCES student_profiles(student_id) ON DELETE CASCADE,
    badge_id INTEGER NOT NULL REFERENCES badges(badge_id) ON DELETE CASCADE,
    earned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(student_id, badge_id)
);

CREATE INDEX idx_student_badges_student ON student_badges(student_id);
CREATE INDEX idx_student_badges_badge ON student_badges(badge_id);

-- =====================================================
-- CODING PRACTICE
-- =====================================================

CREATE TABLE coding_problems (
    problem_id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    difficulty VARCHAR(20) CHECK (difficulty IN ('Easy', 'Medium', 'Hard')),
    category VARCHAR(100) NOT NULL,
    test_cases TEXT NOT NULL, -- JSON format
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_problems_difficulty ON coding_problems(difficulty);
CREATE INDEX idx_problems_category ON coding_problems(category);

CREATE TABLE student_submissions (
    submission_id SERIAL PRIMARY KEY,
    student_id INTEGER NOT NULL REFERENCES student_profiles(student_id) ON DELETE CASCADE,
    problem_id INTEGER NOT NULL REFERENCES coding_problems(problem_id) ON DELETE CASCADE,
    code TEXT NOT NULL,
    language VARCHAR(50) NOT NULL,
    status VARCHAR(20) CHECK (status IN ('accepted', 'wrong_answer', 'runtime_error', 'time_limit')),
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_submissions_student ON student_submissions(student_id);
CREATE INDEX idx_submissions_problem ON student_submissions(problem_id);
CREATE INDEX idx_submissions_status ON student_submissions(status);

-- =====================================================
-- TRIGGERS FOR UPDATED_AT
-- =====================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply trigger to all tables with updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_student_profiles_updated_at BEFORE UPDATE ON student_profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_staff_profiles_updated_at BEFORE UPDATE ON staff_profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tests_updated_at BEFORE UPDATE ON tests
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_roadmaps_updated_at BEFORE UPDATE ON roadmaps
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_student_skills_updated_at BEFORE UPDATE ON student_skills
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_student_topic_progress_updated_at BEFORE UPDATE ON student_topic_progress
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_coding_problems_updated_at BEFORE UPDATE ON coding_problems
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- VIEWS FOR COMMON QUERIES
-- =====================================================

-- View for student dashboard stats
CREATE VIEW student_dashboard_stats AS
SELECT 
    sp.student_id,
    u.name,
    COUNT(DISTINCT ta.attempt_id) as tests_completed,
    COALESCE(AVG(ta.percentage), 0) as average_score,
    COUNT(DISTINCT sb.badge_id) as badges_earned,
    sp.current_streak,
    sp.total_problems_solved
FROM student_profiles sp
JOIN users u ON sp.student_id = u.user_id
LEFT JOIN test_attempts ta ON sp.student_id = ta.student_id
LEFT JOIN student_badges sb ON sp.student_id = sb.student_id
GROUP BY sp.student_id, u.name, sp.current_streak, sp.total_problems_solved;

-- View for staff analytics
CREATE VIEW staff_analytics AS
SELECT 
    sf.staff_id,
    u.name,
    COUNT(DISTINCT t.test_id) as tests_created,
    COUNT(DISTINCT f.feedback_id) as feedback_received,
    COALESCE(AVG(f.rating), 0) as average_rating
FROM staff_profiles sf
JOIN users u ON sf.staff_id = u.user_id
LEFT JOIN tests t ON sf.staff_id = t.created_by
LEFT JOIN feedback f ON f.category_id IN (
    SELECT category_id FROM feedback_categories WHERE category_name = 'Teaching Quality'
)
GROUP BY sf.staff_id, u.name;

-- View for admin system stats
CREATE VIEW admin_system_stats AS
SELECT 
    (SELECT COUNT(*) FROM users WHERE role = 'student') as total_students,
    (SELECT COUNT(*) FROM users WHERE role = 'staff') as total_staff,
    (SELECT COUNT(*) FROM tests) as total_tests,
    (SELECT COUNT(*) FROM feedback) as total_feedback,
    (SELECT COUNT(*) FROM feedback WHERE status = 'pending') as pending_feedback,
    (SELECT COALESCE(AVG(rating), 0) FROM feedback) as average_rating;

-- =====================================================
-- SAMPLE DATA INSERTION
-- =====================================================

-- Insert sample users
INSERT INTO users (email, password_hash, role, name) VALUES
    ('student@example.com', '$2a$10$dummyhash1', 'student', 'Alex Johnson'),
    ('staff@example.com', '$2a$10$dummyhash2', 'staff', 'Dr. Sarah Williams'),
    ('admin@example.com', '$2a$10$dummyhash3', 'admin', 'Admin User');

-- Insert student profile
INSERT INTO student_profiles (student_id, roll_number, department, year, semester) VALUES
    (1, 'CS2021001', 'Computer Science', 3, 6);

-- Insert staff profile
INSERT INTO staff_profiles (staff_id, employee_id, department, designation, google_classroom_code) VALUES
    (2, 'STAFF2019045', 'Computer Science', 'Assistant Professor', 'abc123xyz');

-- Insert staff subjects
INSERT INTO staff_subjects (staff_id, subject_name) VALUES
    (2, 'Data Structures'),
    (2, 'Algorithms'),
    (2, 'Web Development');

-- Insert student skills
INSERT INTO student_skills (student_id, skill_name, proficiency_level) VALUES
    (1, 'JavaScript', 85),
    (1, 'React', 75),
    (1, 'Python', 70),
    (1, 'DSA', 65),
    (1, 'SQL', 60);

-- =====================================================
-- END OF SCHEMA
-- =====================================================
