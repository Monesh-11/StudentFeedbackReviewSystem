import Card from '../../components/shared/Card';
import ProgressBar from '../../components/shared/ProgressBar';
import { results } from '../../data/dummyData';
import './Results.css';

const Results = () => {
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    return (
        <div className="results-page fade-in">
            <div className="page-header">
                <h1>Test Results 📈</h1>
                <p>View your performance and detailed analytics</p>
            </div>

            <div className="results-container">
                {results.map((result, idx) => (
                    <Card key={idx} className="result-card">
                        <div className="result-header">
                            <div>
                                <h3>{result.testTitle}</h3>
                                <p className="result-date">Submitted on {formatDate(result.submittedDate)}</p>
                            </div>
                            <div className="result-score">
                                <div className="score-value">{result.percentage}%</div>
                                <div className="score-label">Score</div>
                            </div>
                        </div>

                        <div className="result-stats">
                            <div className="stat-box">
                                <div className="stat-number">{result.score}</div>
                                <div className="stat-label">Marks Obtained</div>
                            </div>
                            <div className="stat-box">
                                <div className="stat-number">#{result.rank}</div>
                                <div className="stat-label">Rank</div>
                            </div>
                            <div className="stat-box">
                                <div className="stat-number">{result.timeTaken}m</div>
                                <div className="stat-label">Time Taken</div>
                            </div>
                        </div>

                        <div className="result-breakdown">
                            <h4>Answer Breakdown</h4>
                            <div className="breakdown-grid">
                                <div className="breakdown-item correct">
                                    <span className="breakdown-icon">✓</span>
                                    <span className="breakdown-count">{result.correctAnswers}</span>
                                    <span className="breakdown-label">Correct</span>
                                </div>
                                <div className="breakdown-item wrong">
                                    <span className="breakdown-icon">✗</span>
                                    <span className="breakdown-count">{result.wrongAnswers}</span>
                                    <span className="breakdown-label">Wrong</span>
                                </div>
                                <div className="breakdown-item unattempted">
                                    <span className="breakdown-icon">○</span>
                                    <span className="breakdown-count">{result.unattempted}</span>
                                    <span className="breakdown-label">Unattempted</span>
                                </div>
                            </div>
                        </div>

                        <div className="topic-wise">
                            <h4>Topic-wise Performance</h4>
                            {result.topicWise.map((topic, tIdx) => (
                                <div key={tIdx} className="topic-progress">
                                    <ProgressBar
                                        label={`${topic.topic} (${topic.score}/${topic.total})`}
                                        progress={(topic.score / topic.total) * 100}
                                        color="var(--student-gradient)"
                                    />
                                </div>
                            ))}
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default Results;
