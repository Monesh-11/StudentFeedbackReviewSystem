import { useState } from 'react';
import Card from '../../components/shared/Card';
import Button from '../../components/shared/Button';
import { feedbackCategories } from '../../data/dummyData';
import './FeedbackSubmission.css';

const FeedbackSubmission = () => {
    const [formData, setFormData] = useState({
        category: '',
        rating: 0,
        message: '',
        isAnonymous: true
    });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate submission
        setSubmitted(true);
        setTimeout(() => {
            setSubmitted(false);
            setFormData({ category: '', rating: 0, message: '', isAnonymous: true });
        }, 3000);
    };

    return (
        <div className="feedback-submission fade-in">
            <div className="page-header">
                <h1>Submit Feedback 💬</h1>
                <p>Your feedback helps us improve. Submit anonymously or with your name.</p>
            </div>

            <div className="feedback-container">
                <Card>
                    {submitted ? (
                        <div className="success-message">
                            <div className="success-icon">✓</div>
                            <h2>Feedback Submitted!</h2>
                            <p>Thank you for your valuable feedback.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="feedback-form">
                            <div className="form-group">
                                <label>Category *</label>
                                <select
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    required
                                >
                                    <option value="">Select a category</option>
                                    {feedbackCategories.map((cat, idx) => (
                                        <option key={idx} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Rating *</label>
                                <div className="rating-selector">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            type="button"
                                            className={`star ${formData.rating >= star ? 'active' : ''}`}
                                            onClick={() => setFormData({ ...formData, rating: star })}
                                        >
                                            ★
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Your Feedback *</label>
                                <textarea
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    placeholder="Share your thoughts..."
                                    rows={6}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label className="checkbox-label">
                                    <input
                                        type="checkbox"
                                        checked={formData.isAnonymous}
                                        onChange={(e) => setFormData({ ...formData, isAnonymous: e.target.checked })}
                                    />
                                    Submit anonymously
                                </label>
                                <p className="help-text">
                                    {formData.isAnonymous
                                        ? '🔒 Your identity will be hidden (Admin can trace if needed)'
                                        : '👤 Your name will be visible with this feedback'
                                    }
                                </p>
                            </div>

                            <Button type="submit" variant="success" size="large">
                                Submit Feedback
                            </Button>
                        </form>
                    )}
                </Card>
            </div>
        </div>
    );
};

export default FeedbackSubmission;
