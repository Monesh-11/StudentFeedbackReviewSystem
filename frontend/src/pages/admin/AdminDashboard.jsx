import StatsCard from '../../components/shared/StatsCard';
import Card from '../../components/shared/Card';
import { adminStats, allUsers, feedbackData } from '../../data/dummyData';
import './AdminDashboard.css';

const AdminDashboard = () => {
    const recentActivity = [
        { type: 'user', message: 'New student registered: Emma Davis', time: '2 hours ago' },
        { type: 'feedback', message: 'New feedback submitted', time: '3 hours ago' },
        { type: 'test', message: 'Test published by Dr. Sarah Williams', time: '5 hours ago' },
        { type: 'user', message: 'Staff profile updated: Dr. John Smith', time: '1 day ago' }
    ];

    return (
        <div className="admin-dashboard fade-in">
            <div className="dashboard-header">
                <h1>Admin Dashboard 🎛️</h1>
                <p>System overview and management</p>
            </div>

            <div className="stats-grid">
                <StatsCard
                    icon="👨‍🎓"
                    label="Total Students"
                    value={adminStats.totalStudents}
                    color="var(--accent-blue)"
                />
                <StatsCard
                    icon="👨‍🏫"
                    label="Total Staff"
                    value={adminStats.totalStaff}
                    color="var(--accent-purple)"
                />
                <StatsCard
                    icon="📝"
                    label="Total Tests"
                    value={adminStats.totalTests}
                    color="var(--accent-green)"
                />
                <StatsCard
                    icon="💬"
                    label="Total Feedback"
                    value={adminStats.totalFeedback}
                    color="var(--accent-orange)"
                />
            </div>

            <div className="dashboard-grid">
                <Card>
                    <h3>System Health</h3>
                    <div className="health-display">
                        <div className="health-value">{adminStats.systemHealth}%</div>
                        <div className="health-status">All Systems Operational</div>
                    </div>
                    <div className="health-bar">
                        <div
                            className="health-fill"
                            style={{ width: `${adminStats.systemHealth}%` }}
                        ></div>
                    </div>
                </Card>

                <Card>
                    <h3>Pending Actions</h3>
                    <div className="pending-list">
                        <div className="pending-item">
                            <span className="pending-count">{adminStats.pendingFeedback}</span>
                            <span className="pending-label">Feedback to Review</span>
                        </div>
                        <div className="pending-item">
                            <span className="pending-count">{adminStats.activeUsers}</span>
                            <span className="pending-label">Active Users</span>
                        </div>
                    </div>
                </Card>

                <Card className="activity-card">
                    <h3>Recent Activity</h3>
                    <div className="activity-list">
                        {recentActivity.map((activity, idx) => (
                            <div key={idx} className="activity-item">
                                <div className={`activity-icon ${activity.type}`}>
                                    {activity.type === 'user' ? '👤' : activity.type === 'feedback' ? '💬' : '📝'}
                                </div>
                                <div className="activity-content">
                                    <p>{activity.message}</p>
                                    <span className="activity-time">{activity.time}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default AdminDashboard;
