import StatsCard from '../../components/shared/StatsCard';
import Card from '../../components/shared/Card';
import { staffAnalytics } from '../../data/dummyData';
import './StaffDashboard.css';

const StaffDashboard = () => {
    return (
        <div className="staff-dashboard fade-in">
            <div className="dashboard-header">
                <h1>Staff Dashboard 👨‍🏫</h1>
                <p>Overview of your teaching analytics and student feedback</p>
            </div>

            <div className="stats-grid">
                <StatsCard
                    icon="👥"
                    label="Total Students"
                    value={staffAnalytics.totalStudents}
                    color="var(--accent-blue)"
                />
                <StatsCard
                    icon="📊"
                    label="Average Score"
                    value={`${staffAnalytics.averageClassScore}%`}
                    color="var(--accent-green)"
                    trend={3.5}
                />
                <StatsCard
                    icon="📝"
                    label="Tests Created"
                    value={staffAnalytics.testsCreated}
                    color="var(--accent-purple)"
                />
                <StatsCard
                    icon="💬"
                    label="Feedback Received"
                    value={staffAnalytics.feedbackReceived}
                    color="var(--accent-orange)"
                />
            </div>

            <div className="dashboard-grid">
                <Card>
                    <h3>Student Performance Rating</h3>
                    <div className="rating-display">
                        <div className="rating-value">{staffAnalytics.positiveRating}%</div>
                        <div className="rating-label">Positive Rating</div>
                    </div>
                    <div className="rating-bar">
                        <div
                            className="rating-fill"
                            style={{ width: `${staffAnalytics.positiveRating}%` }}
                        ></div>
                    </div>
                </Card>

                <Card>
                    <h3>Recent Feedback</h3>
                    <div className="feedback-list">
                        {staffAnalytics.recentFeedback.map((fb, idx) => (
                            <div key={idx} className="feedback-item">
                                <div className="feedback-rating">
                                    {'⭐'.repeat(fb.rating)}
                                </div>
                                <p>{fb.message}</p>
                                <span className="feedback-date">{fb.date}</span>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default StaffDashboard;
