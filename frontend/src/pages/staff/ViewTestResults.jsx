import Card from '../../components/shared/Card';
import { results } from '../../data/dummyData';
import './ViewTestResults.css';

const ViewTestResults = () => {
    // Mock student results data
    const studentResults = [
        { id: 1, name: 'Alex Johnson', rollNo: 'CS2021001', score: 85, rank: 12, status: 'Completed' },
        { id: 2, name: 'Emma Davis', rollNo: 'CS2021002', score: 92, rank: 5, status: 'Completed' },
        { id: 3, name: 'Michael Brown', rollNo: 'CS2021003', score: 78, rank: 25, status: 'Completed' },
        { id: 4, name: 'Sophia Wilson', rollNo: 'CS2021004', score: 88, rank: 10, status: 'Completed' },
        { id: 5, name: 'James Taylor', rollNo: 'CS2021005', score: 0, rank: 0, status: 'Absent' }
    ];

    const testInfo = {
        title: 'Data Structures - Arrays & Linked Lists',
        totalStudents: 95,
        completed: 90,
        absent: 5,
        averageScore: 78.5,
        highestScore: 98,
        lowestScore: 45
    };

    return (
        <div className="view-test-results fade-in">
            <div className="page-header">
                <h1>Test Results 📊</h1>
                <p>View and analyze student performance</p>
            </div>

            <Card className="test-info-card">
                <h3>{testInfo.title}</h3>
                <div className="test-stats">
                    <div className="stat-item">
                        <span className="stat-value">{testInfo.totalStudents}</span>
                        <span className="stat-label">Total Students</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-value">{testInfo.completed}</span>
                        <span className="stat-label">Completed</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-value">{testInfo.absent}</span>
                        <span className="stat-label">Absent</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-value">{testInfo.averageScore}%</span>
                        <span className="stat-label">Average Score</span>
                    </div>
                </div>
            </Card>

            <Card>
                <div className="results-header">
                    <h3>Student Results</h3>
                    <Button variant="secondary">Export to CSV</Button>
                </div>

                <div className="results-table-container">
                    <table className="results-table">
                        <thead>
                            <tr>
                                <th>Roll No</th>
                                <th>Student Name</th>
                                <th>Score</th>
                                <th>Rank</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {studentResults.map(student => (
                                <tr key={student.id}>
                                    <td>{student.rollNo}</td>
                                    <td>{student.name}</td>
                                    <td>
                                        <span className={`score ${student.score >= 80 ? 'high' : student.score >= 60 ? 'medium' : 'low'}`}>
                                            {student.score}%
                                        </span>
                                    </td>
                                    <td>{student.rank || '-'}</td>
                                    <td>
                                        <span className={`status ${student.status.toLowerCase()}`}>
                                            {student.status}
                                        </span>
                                    </td>
                                    <td>
                                        <button className="view-details-btn">View Details</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
};

// Import Button component
import Button from '../../components/shared/Button';

export default ViewTestResults;
