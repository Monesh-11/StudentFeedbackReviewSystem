import Card from '../../components/shared/Card';
import Button from '../../components/shared/Button';
import { tests } from '../../data/dummyData';
import './TestList.css';

const TestList = () => {
    const getStatusColor = (status) => {
        switch (status) {
            case 'completed': return 'var(--accent-green)';
            case 'ongoing': return 'var(--accent-orange)';
            case 'upcoming': return 'var(--accent-blue)';
            default: return 'var(--text-muted)';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'completed': return '✓';
            case 'ongoing': return '⏳';
            case 'upcoming': return '📅';
            default: return '○';
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="test-list fade-in">
            <div className="page-header">
                <h1>Tests 📝</h1>
                <p>View and take your scheduled tests</p>
            </div>

            <div className="tests-container">
                {tests.map(test => (
                    <Card key={test.id} className="test-card">
                        <div className="test-header">
                            <div>
                                <h3>{test.title}</h3>
                                <p className="test-subject">{test.subject}</p>
                            </div>
                            <div
                                className="test-status"
                                style={{ color: getStatusColor(test.status) }}
                            >
                                <span className="status-icon">{getStatusIcon(test.status)}</span>
                                <span className="status-text">{test.status.toUpperCase()}</span>
                            </div>
                        </div>

                        <div className="test-details">
                            <div className="detail-item">
                                <span className="detail-label">Duration:</span>
                                <span className="detail-value">{test.duration} minutes</span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">Questions:</span>
                                <span className="detail-value">{test.totalQuestions}</span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">Total Marks:</span>
                                <span className="detail-value">{test.totalMarks}</span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">Scheduled:</span>
                                <span className="detail-value">{formatDate(test.scheduledDate)}</span>
                            </div>
                            {test.score !== undefined && (
                                <div className="detail-item">
                                    <span className="detail-label">Your Score:</span>
                                    <span className="detail-value score">{test.score}%</span>
                                </div>
                            )}
                        </div>

                        <div className="test-footer">
                            <span className="created-by">By {test.createdBy}</span>
                            {test.status === 'ongoing' && (
                                <Button variant="success">Start Test</Button>
                            )}
                            {test.status === 'upcoming' && (
                                <Button variant="secondary" disabled>Not Started</Button>
                            )}
                            {test.status === 'completed' && (
                                <Button variant="primary">View Results</Button>
                            )}
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default TestList;
