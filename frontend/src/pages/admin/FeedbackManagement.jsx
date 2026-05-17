import { useState } from 'react';
import Card from '../../components/shared/Card';
import Button from '../../components/shared/Button';
import { feedbackData } from '../../data/dummyData';
import './FeedbackManagement.css';

const FeedbackManagement = () => {
    const [feedbacks, setFeedbacks] = useState(feedbackData);
    const [filter, setFilter] = useState('all');
    const [selectedFeedback, setSelectedFeedback] = useState(null);

    const filteredFeedbacks = filter === 'all'
        ? feedbacks
        : feedbacks.filter(f => f.status === filter);

    const handleTrace = (feedback) => {
        alert(`Student ID: ${feedback.studentId}\nStudent Name: ${feedback.studentName === 'Anonymous' ? 'Alex Johnson' : feedback.studentName}`);
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
        <div className="feedback-management fade-in">
            <div className="page-header">
                <h1>Feedback Management 💬</h1>
                <p>Review and manage student feedback</p>
            </div>

            <Card>
                <div className="filter-section">
                    <div className="filter-buttons">
                        <button
                            className={filter === 'all' ? 'active' : ''}
                            onClick={() => setFilter('all')}
                        >
                            All ({feedbacks.length})
                        </button>
                        <button
                            className={filter === 'pending' ? 'active' : ''}
                            onClick={() => setFilter('pending')}
                        >
                            Pending ({feedbacks.filter(f => f.status === 'pending').length})
                        </button>
                        <button
                            className={filter === 'reviewed' ? 'active' : ''}
                            onClick={() => setFilter('reviewed')}
                        >
                            Reviewed ({feedbacks.filter(f => f.status === 'reviewed').length})
                        </button>
                    </div>
                </div>

                <div className="feedback-list">
                    {filteredFeedbacks.map(feedback => (
                        <div key={feedback.id} className="feedback-card">
                            <div className="feedback-header">
                                <div className="feedback-meta">
                                    <span className="feedback-category">{feedback.category}</span>
                                    <span className="feedback-date">{formatDate(feedback.createdDate)}</span>
                                </div>
                                <div className="feedback-rating">
                                    {'⭐'.repeat(feedback.rating)}
                                </div>
                            </div>

                            <div className="feedback-content">
                                <p>{feedback.message}</p>
                            </div>

                            <div className="feedback-footer">
                                <div className="feedback-info">
                                    <span className="feedback-author">
                                        {feedback.isAnonymous ? '🔒 Anonymous' : feedback.studentName}
                                    </span>
                                    <span className={`feedback-status ${feedback.status}`}>
                                        {feedback.status.toUpperCase()}
                                    </span>
                                </div>
                                <div className="feedback-actions">
                                    {feedback.isAnonymous && (
                                        <Button
                                            variant="secondary"
                                            size="small"
                                            onClick={() => handleTrace(feedback)}
                                        >
                                            Trace Student
                                        </Button>
                                    )}
                                    {feedback.status === 'pending' && (
                                        <Button variant="success" size="small">
                                            Mark as Reviewed
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
};

export default FeedbackManagement;
