import Card from '../../components/shared/Card';
import ProgressBar from '../../components/shared/ProgressBar';
import Button from '../../components/shared/Button';
import { roadmaps } from '../../data/dummyData';
import './Roadmap.css';

const Roadmap = () => {
    const roadmapData = Object.values(roadmaps);

    return (
        <div className="roadmap-page fade-in">
            <div className="page-header">
                <h1>Learning Roadmap 🗺️</h1>
                <p>Track your progress across different subjects</p>
            </div>

            <div className="roadmap-grid">
                {roadmapData.map((roadmap, index) => (
                    <Card key={index}>
                        <div className="roadmap-header">
                            <h3>{roadmap.title}</h3>
                            <div className="roadmap-progress">
                                <span className="progress-percentage">{roadmap.progress}%</span>
                            </div>
                        </div>

                        <ProgressBar
                            progress={roadmap.progress}
                            color="var(--student-gradient)"
                            showPercentage={false}
                        />

                        <div className="topics-list">
                            {roadmap.topics.map((topic, idx) => (
                                <div key={idx} className={`topic-item ${topic.completed ? 'completed' : 'pending'}`}>
                                    <div className="topic-status">
                                        {topic.completed ? '✓' : '○'}
                                    </div>
                                    <div className="topic-content">
                                        <div className="topic-name">{topic.name}</div>
                                        {topic.resources && topic.resources.length > 0 && (
                                            <div className="topic-resources">
                                                {topic.resources.map((resource, rIdx) => (
                                                    <a
                                                        key={rIdx}
                                                        href={resource.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="resource-link"
                                                    >
                                                        🔗 {resource.title}
                                                    </a>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="roadmap-footer">
                            <Button variant="primary" size="small">
                                Continue Learning
                            </Button>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default Roadmap;
