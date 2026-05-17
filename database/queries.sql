-- =====================================================
-- ADDITIONAL USEFUL QUERIES
-- Student Feedback & Learning Management System
-- =====================================================

-- =====================================================
-- STUDENT QUERIES
-- =====================================================

-- Get complete student profile with stats
SELECT 
    u.name,
    u.email,
    sp.*,
    COUNT(DISTINCT ta.attempt_id) as total_tests,
    COALESCE(AVG(ta.percentage), 0) as avg_score,
    COUNT(DISTINCT sb.badge_id) as total_badges
FROM users u
JOIN student_profiles sp ON u.user_id = sp.student_id
LEFT JOIN test_attempts ta ON sp.student_id = ta.student_id
LEFT JOIN student_badges sb ON sp.student_id = sb.student_id
WHERE u.user_id = 1
GROUP BY u.user_id, u.name, u.email, sp.student_id;

-- Get student's learning progress across all roadmaps
SELECT 
    r.title as roadmap,
    COUNT(rt.topic_id) as total_topics,
    COUNT(CASE WHEN stp.is_completed THEN 1 END) as completed_topics,
    ROUND(COUNT(CASE WHEN stp.is_completed THEN 1 END) * 100.0 / COUNT(rt.topic_id), 2) as completion_percentage
FROM roadmaps r
JOIN roadmap_topics rt ON r.roadmap_id = rt.roadmap_id
LEFT JOIN student_topic_progress stp ON rt.topic_id = stp.topic_id AND stp.student_id = 1
GROUP BY r.roadmap_id, r.title
ORDER BY r.roadmap_id;

-- Get student's recent test results
SELECT 
    t.title,
    t.subject,
    ta.score,
    ta.percentage,
    ta.rank,
    ta.submitted_at
FROM test_attempts ta
JOIN tests t ON ta.test_id = t.test_id
WHERE ta.student_id = 1
ORDER BY ta.submitted_at DESC
LIMIT 10;

-- Get student's earned badges
SELECT 
    b.badge_name,
    b.description,
    b.icon,
    b.color,
    sb.earned_at
FROM student_badges sb
JOIN badges b ON sb.badge_id = b.badge_id
WHERE sb.student_id = 1
ORDER BY sb.earned_at DESC;

-- =====================================================
-- STAFF QUERIES
-- =====================================================

-- Get staff's created tests with attempt statistics
SELECT 
    t.test_id,
    t.title,
    t.subject,
    t.scheduled_date,
    t.status,
    COUNT(ta.attempt_id) as total_attempts,
    COALESCE(AVG(ta.percentage), 0) as average_score,
    MAX(ta.percentage) as highest_score,
    MIN(ta.percentage) as lowest_score
FROM tests t
LEFT JOIN test_attempts ta ON t.test_id = ta.test_id
WHERE t.created_by = 2
GROUP BY t.test_id
ORDER BY t.scheduled_date DESC;

-- Get feedback for staff's subjects
SELECT 
    f.feedback_id,
    CASE WHEN f.is_anonymous THEN 'Anonymous' ELSE u.name END as student_name,
    fc.category_name,
    f.rating,
    f.message,
    f.created_at,
    f.status
FROM feedback f
JOIN feedback_categories fc ON f.category_id = fc.category_id
JOIN student_profiles sp ON f.student_id = sp.student_id
JOIN users u ON sp.student_id = u.user_id
WHERE fc.category_name IN ('Course Content', 'Teaching Quality')
ORDER BY f.created_at DESC;

-- Get detailed test results for a specific test
SELECT 
    u.name as student_name,
    sp.roll_number,
    ta.score,
    ta.percentage,
    ta.correct_answers,
    ta.wrong_answers,
    ta.unattempted,
    ta.time_taken_minutes,
    ta.rank
FROM test_attempts ta
JOIN student_profiles sp ON ta.student_id = sp.student_id
JOIN users u ON sp.student_id = u.user_id
WHERE ta.test_id = 1
ORDER BY ta.score DESC;

-- =====================================================
-- ADMIN QUERIES
-- =====================================================

-- Get all users with their roles and profiles
SELECT 
    u.user_id,
    u.name,
    u.email,
    u.role,
    u.status,
    CASE 
        WHEN u.role = 'student' THEN sp.roll_number
        WHEN u.role = 'staff' THEN stf.employee_id
        ELSE NULL
    END as identifier,
    CASE 
        WHEN u.role = 'student' THEN sp.department
        WHEN u.role = 'staff' THEN stf.department
        ELSE NULL
    END as department
FROM users u
LEFT JOIN student_profiles sp ON u.user_id = sp.student_id
LEFT JOIN staff_profiles stf ON u.user_id = stf.staff_id
ORDER BY u.role, u.name;

-- Get all pending feedback with student details (for tracing)
SELECT 
    f.feedback_id,
    u.name as student_name,
    u.email as student_email,
    sp.roll_number,
    fc.category_name,
    f.rating,
    f.message,
    f.is_anonymous,
    f.created_at
FROM feedback f
JOIN feedback_categories fc ON f.category_id = fc.category_id
JOIN student_profiles sp ON f.student_id = sp.student_id
JOIN users u ON sp.student_id = u.user_id
WHERE f.status = 'pending'
ORDER BY f.created_at DESC;

-- Get system activity summary
SELECT 
    DATE(created_at) as date,
    COUNT(*) as total_activities
FROM (
    SELECT created_at FROM users
    UNION ALL
    SELECT created_at FROM feedback
    UNION ALL
    SELECT created_at FROM tests
    UNION ALL
    SELECT submitted_at as created_at FROM test_attempts
) activities
WHERE created_at >= CURRENT_DATE - INTERVAL '30 days'
GROUP BY DATE(created_at)
ORDER BY date DESC;

-- Get top performing students
SELECT 
    u.name,
    sp.roll_number,
    sp.department,
    COUNT(ta.attempt_id) as tests_taken,
    ROUND(AVG(ta.percentage), 2) as average_score,
    COUNT(sb.badge_id) as badges_earned
FROM student_profiles sp
JOIN users u ON sp.student_id = u.user_id
LEFT JOIN test_attempts ta ON sp.student_id = ta.student_id
LEFT JOIN student_badges sb ON sp.student_id = sb.student_id
GROUP BY sp.student_id, u.name, sp.roll_number, sp.department
HAVING COUNT(ta.attempt_id) > 0
ORDER BY average_score DESC
LIMIT 10;

-- =====================================================
-- TEST ANALYSIS QUERIES
-- =====================================================

-- Get question-wise performance for a test
SELECT 
    q.question_id,
    q.question_text,
    COUNT(sa.answer_id) as total_attempts,
    COUNT(CASE WHEN sa.is_correct THEN 1 END) as correct_count,
    ROUND(COUNT(CASE WHEN sa.is_correct THEN 1 END) * 100.0 / COUNT(sa.answer_id), 2) as success_rate
FROM questions q
LEFT JOIN student_answers sa ON q.question_id = sa.question_id
WHERE q.test_id = 1
GROUP BY q.question_id, q.question_text
ORDER BY q.question_order;

-- Get student's answer sheet for a test
SELECT 
    q.question_order,
    q.question_text,
    q.option_a,
    q.option_b,
    q.option_c,
    q.option_d,
    q.correct_answer,
    sa.selected_answer,
    sa.is_correct,
    sa.marks_obtained
FROM test_attempts ta
JOIN student_answers sa ON ta.attempt_id = sa.attempt_id
JOIN questions q ON sa.question_id = q.question_id
WHERE ta.test_id = 1 AND ta.student_id = 1
ORDER BY q.question_order;

-- =====================================================
-- ROADMAP QUERIES
-- =====================================================

-- Get roadmap with all topics and student progress
SELECT 
    r.title as roadmap,
    rt.topic_name,
    rt.topic_order,
    COALESCE(stp.is_completed, false) as completed,
    stp.completed_at,
    COUNT(tr.resource_id) as resource_count
FROM roadmaps r
JOIN roadmap_topics rt ON r.roadmap_id = rt.roadmap_id
LEFT JOIN student_topic_progress stp ON rt.topic_id = stp.topic_id AND stp.student_id = 1
LEFT JOIN topic_resources tr ON rt.topic_id = tr.topic_id
WHERE r.roadmap_id = 1
GROUP BY r.title, rt.topic_id, rt.topic_name, rt.topic_order, stp.is_completed, stp.completed_at
ORDER BY rt.topic_order;

-- Get resources for a specific topic
SELECT 
    resource_title,
    resource_url,
    resource_type
FROM topic_resources
WHERE topic_id = 1
ORDER BY resource_id;

-- =====================================================
-- GAMIFICATION QUERIES
-- =====================================================

-- Check if student qualifies for new badges
-- Example: Quick Learner badge (90%+ in 3 consecutive tests)
WITH recent_tests AS (
    SELECT 
        student_id,
        percentage,
        ROW_NUMBER() OVER (PARTITION BY student_id ORDER BY submitted_at DESC) as rn
    FROM test_attempts
    WHERE student_id = 1
)
SELECT 
    CASE 
        WHEN COUNT(CASE WHEN percentage >= 90 THEN 1 END) >= 3 THEN 'Eligible for Quick Learner badge'
        ELSE 'Not eligible yet'
    END as badge_status
FROM recent_tests
WHERE rn <= 3;

-- Get badge leaderboard
SELECT 
    u.name,
    sp.roll_number,
    COUNT(sb.badge_id) as badge_count
FROM student_profiles sp
JOIN users u ON sp.student_id = u.user_id
LEFT JOIN student_badges sb ON sp.student_id = sb.student_id
GROUP BY sp.student_id, u.name, sp.roll_number
ORDER BY badge_count DESC
LIMIT 10;

-- =====================================================
-- CODING PRACTICE QUERIES
-- =====================================================

-- Get student's coding statistics
SELECT 
    COUNT(DISTINCT problem_id) as problems_attempted,
    COUNT(CASE WHEN status = 'accepted' THEN 1 END) as problems_solved,
    COUNT(*) as total_submissions,
    ROUND(COUNT(CASE WHEN status = 'accepted' THEN 1 END) * 100.0 / COUNT(DISTINCT problem_id), 2) as success_rate
FROM student_submissions
WHERE student_id = 1;

-- Get problems by difficulty with solve status
SELECT 
    cp.problem_id,
    cp.title,
    cp.difficulty,
    cp.category,
    CASE 
        WHEN EXISTS (
            SELECT 1 FROM student_submissions ss 
            WHERE ss.problem_id = cp.problem_id 
            AND ss.student_id = 1 
            AND ss.status = 'accepted'
        ) THEN 'Solved'
        WHEN EXISTS (
            SELECT 1 FROM student_submissions ss 
            WHERE ss.problem_id = cp.problem_id 
            AND ss.student_id = 1
        ) THEN 'Attempted'
        ELSE 'Not Attempted'
    END as status
FROM coding_problems cp
ORDER BY cp.difficulty, cp.problem_id;

-- =====================================================
-- REPORTING QUERIES
-- =====================================================

-- Monthly test performance report
SELECT 
    TO_CHAR(ta.submitted_at, 'YYYY-MM') as month,
    COUNT(DISTINCT ta.student_id) as students_participated,
    COUNT(ta.attempt_id) as total_attempts,
    ROUND(AVG(ta.percentage), 2) as average_score
FROM test_attempts ta
WHERE ta.submitted_at >= CURRENT_DATE - INTERVAL '6 months'
GROUP BY TO_CHAR(ta.submitted_at, 'YYYY-MM')
ORDER BY month DESC;

-- Department-wise performance
SELECT 
    sp.department,
    COUNT(DISTINCT sp.student_id) as total_students,
    COUNT(ta.attempt_id) as total_tests_taken,
    ROUND(AVG(ta.percentage), 2) as average_score,
    COUNT(sb.badge_id) as total_badges_earned
FROM student_profiles sp
LEFT JOIN test_attempts ta ON sp.student_id = ta.student_id
LEFT JOIN student_badges sb ON sp.student_id = sb.student_id
GROUP BY sp.department
ORDER BY average_score DESC;

-- Feedback sentiment analysis
SELECT 
    fc.category_name,
    COUNT(*) as total_feedback,
    ROUND(AVG(f.rating), 2) as average_rating,
    COUNT(CASE WHEN f.rating >= 4 THEN 1 END) as positive_count,
    COUNT(CASE WHEN f.rating <= 2 THEN 1 END) as negative_count
FROM feedback f
JOIN feedback_categories fc ON f.category_id = fc.category_id
GROUP BY fc.category_id, fc.category_name
ORDER BY average_rating DESC;
