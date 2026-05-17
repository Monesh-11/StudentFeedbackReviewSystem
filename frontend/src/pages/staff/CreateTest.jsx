import { useState } from 'react';
import Card from '../../components/shared/Card';
import Button from '../../components/shared/Button';
import './CreateTest.css';

const CreateTest = () => {
    const [testData, setTestData] = useState({
        title: '',
        subject: '',
        duration: '',
        totalMarks: 100,
        scheduledDate: '',
        questions: [{ question: '', options: ['', '', '', ''], correctAnswer: 0, marks: 5 }]
    });

    const addQuestion = () => {
        setTestData({
            ...testData,
            questions: [...testData.questions, { question: '', options: ['', '', '', ''], correctAnswer: 0, marks: 5 }]
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Test created successfully! (Demo mode)');
    };

    return (
        <div className="create-test fade-in">
            <div className="page-header">
                <h1>Create Test ➕</h1>
                <p>Design and schedule a new test for students</p>
            </div>

            <Card>
                <form onSubmit={handleSubmit} className="test-form">
                    <div className="form-section">
                        <h3>Test Details</h3>
                        <div className="form-row">
                            <div className="form-group">
                                <label>Test Title *</label>
                                <input
                                    type="text"
                                    value={testData.title}
                                    onChange={(e) => setTestData({ ...testData, title: e.target.value })}
                                    placeholder="e.g., Data Structures - Mid Term"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Subject *</label>
                                <input
                                    type="text"
                                    value={testData.subject}
                                    onChange={(e) => setTestData({ ...testData, subject: e.target.value })}
                                    placeholder="e.g., Data Structures"
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>Duration (minutes) *</label>
                                <input
                                    type="number"
                                    value={testData.duration}
                                    onChange={(e) => setTestData({ ...testData, duration: e.target.value })}
                                    placeholder="60"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Total Marks *</label>
                                <input
                                    type="number"
                                    value={testData.totalMarks}
                                    onChange={(e) => setTestData({ ...testData, totalMarks: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Scheduled Date & Time *</label>
                                <input
                                    type="datetime-local"
                                    value={testData.scheduledDate}
                                    onChange={(e) => setTestData({ ...testData, scheduledDate: e.target.value })}
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <div className="form-section">
                        <div className="section-header">
                            <h3>Questions ({testData.questions.length})</h3>
                            <Button type="button" variant="secondary" onClick={addQuestion}>
                                + Add Question
                            </Button>
                        </div>

                        {testData.questions.map((q, idx) => (
                            <div key={idx} className="question-block">
                                <h4>Question {idx + 1}</h4>
                                <div className="form-group">
                                    <label>Question Text</label>
                                    <textarea
                                        placeholder="Enter your question here..."
                                        rows={3}
                                    />
                                </div>
                                <div className="options-grid">
                                    {[0, 1, 2, 3].map(optIdx => (
                                        <div key={optIdx} className="form-group">
                                            <label>Option {optIdx + 1}</label>
                                            <input type="text" placeholder={`Option ${optIdx + 1}`} />
                                        </div>
                                    ))}
                                </div>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Correct Answer</label>
                                        <select>
                                            <option value="0">Option 1</option>
                                            <option value="1">Option 2</option>
                                            <option value="2">Option 3</option>
                                            <option value="3">Option 4</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Marks</label>
                                        <input type="number" defaultValue={5} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="form-actions">
                        <Button type="button" variant="secondary">Save as Draft</Button>
                        <Button type="submit" variant="success">Publish Test</Button>
                    </div>
                </form>
            </Card>
        </div>
    );
};

export default CreateTest;
