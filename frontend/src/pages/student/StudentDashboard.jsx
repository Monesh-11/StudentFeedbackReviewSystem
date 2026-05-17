import { useAuth } from '../../context/AuthContext';
import StatsCard from '../../components/shared/StatsCard';
import Card from '../../components/shared/Card';
import ProgressBar from '../../components/shared/ProgressBar';
import Badge from '../../components/shared/Badge';
import { studentStats, badges, roadmaps } from '../../data/dummyData';
import './StudentDashboard.css';

const StudentDashboard = () => {
    const { user } = useAuth();
    const earnedBadges = badges.filter(b => b.earned);

    return (
        <div className="student-dashboard fade-in">
            <div className="dashboard-header">
                <h1>Welcome back, {user?.name}! 👋</h1>
                <p>Here's your learning progress overview</p>
            </div>

            {/* Stats Grid */}
            <div className="stats-grid">
                <StatsCard
                    icon="📝"
                    label="Tests Completed"
                    value={studentStats.testsCompleted}
                    color="var(--student-gradient)"
                />
                <StatsCard
                    icon="⭐"
                    label="Average Score"
                    value={`${studentStats.averageScore}%`}
                    color="var(--accent-green)"
                    trend={5.2}
                />
                <StatsCard
                    icon="🏆"
                    label="Badges Earned"
                    value={`${studentStats.badgesEarned}/${studentStats.totalBadges}`}
                    color="var(--accent-orange)"
                />
                <StatsCard
                    icon="🔥"
                    label="Current Streak"
                    value={`${studentStats.currentStreak} days`}
                    color="var(--accent-red)"
                />
            </div>

            {/* Progress Section */}
            <div className="dashboard-section">
                <h2>Learning Progress</h2>
                <Card>
                    <div className="progress-list">
                        <ProgressBar
                            label="Data Structures & Algorithms"
                            progress={roadmaps.dsa.progress}
                            color="var(--accent-blue)"
                        />
                        <ProgressBar
                            label="Database Management"
                            progress={roadmaps.dbms.progress}
                            color="var(--accent-purple)"
                        />
                        <ProgressBar
                            label="Operating Systems"
                            progress={roadmaps.os.progress}
                            color="var(--accent-green)"
                        />
                        <ProgressBar
                            label="Programming Languages"
                            progress={roadmaps.languages.progress}
                            color="var(--accent-orange)"
                        />
                    </div>
                </Card>
            </div>

            {/* Badges Section */}
            <div className="dashboard-section">
                <h2>Recent Achievements 🎉</h2>
                <div className="badges-grid">
                    {earnedBadges.map(badge => (
                        <Badge key={badge.id} {...badge} />
                    ))}
                </div>
            </div>

            {/* Quick Stats */}
            <div className="dashboard-section">
                <h2>Coding Practice Stats</h2>
                <Card>
                    <div className="coding-stats">
                        <div className="stat-item">
                            <div className="stat-value">{studentStats.problemsSolved}</div>
                            <div className="stat-label">Problems Solved</div>
                        </div>
                        <div className="stat-divider"></div>
                        <div className="stat-item">
                            <div className="stat-value">{studentStats.totalProblems}</div>
                            <div className="stat-label">Total Problems</div>
                        </div>
                        <div className="stat-divider"></div>
                        <div className="stat-item">
                            <div className="stat-value">#{studentStats.rank}</div>
                            <div className="stat-label">Your Rank</div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default StudentDashboard;
