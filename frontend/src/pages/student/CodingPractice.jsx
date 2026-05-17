import { useState } from 'react';
import Card from '../../components/shared/Card';
import Button from '../../components/shared/Button';
import { codingProblems } from '../../data/dummyData';
import './CodingPractice.css';

const CodingPractice = () => {
    const [selectedProblem, setSelectedProblem] = useState(codingProblems[0]);
    const [code, setCode] = useState('// Write your code here\n\n');
    const [language, setLanguage] = useState('javascript');
    const [output, setOutput] = useState('');

    const handleRun = () => {
        setOutput('Code execution simulation...\n\nOutput: [Sample output would appear here]');
    };

    const handleSubmit = () => {
        alert('Solution submitted! (Demo mode)');
    };

    return (
        <div className="coding-practice fade-in">
            <div className="practice-header">
                <h1>Coding Practice 💻</h1>
                <div className="language-selector">
                    <label>Language:</label>
                    <select value={language} onChange={(e) => setLanguage(e.target.value)}>
                        <option value="javascript">JavaScript</option>
                        <option value="python">Python</option>
                        <option value="java">Java</option>
                        <option value="cpp">C++</option>
                    </select>
                </div>
            </div>

            <div className="practice-layout">
                {/* Problem List */}
                <div className="problems-sidebar">
                    <h3>Problems</h3>
                    {codingProblems.map(problem => (
                        <Card
                            key={problem.id}
                            hover={true}
                            className={`problem-card ${selectedProblem.id === problem.id ? 'selected' : ''}`}
                            onClick={() => setSelectedProblem(problem)}
                        >
                            <div className="problem-header-mini">
                                <span className={`difficulty ${problem.difficulty.toLowerCase()}`}>
                                    {problem.difficulty}
                                </span>
                                {problem.solved && <span className="solved-badge">✓</span>}
                            </div>
                            <h4>{problem.title}</h4>
                            <p className="problem-category">{problem.category}</p>
                        </Card>
                    ))}
                </div>

                {/* Problem Description */}
                <div className="problem-section">
                    <Card>
                        <div className="problem-header">
                            <h2>{selectedProblem.title}</h2>
                            <span className={`difficulty ${selectedProblem.difficulty.toLowerCase()}`}>
                                {selectedProblem.difficulty}
                            </span>
                        </div>
                        <div className="problem-description">
                            <p>{selectedProblem.description}</p>
                        </div>
                        <div className="problem-examples">
                            <h4>Examples:</h4>
                            {selectedProblem.examples.map((example, idx) => (
                                <div key={idx} className="example">
                                    <div><strong>Input:</strong> {example.input}</div>
                                    <div><strong>Output:</strong> {example.output}</div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>

                {/* Code Editor */}
                <div className="editor-section">
                    <Card>
                        <div className="editor-header">
                            <h3>Code Editor</h3>
                            <div className="editor-actions">
                                <Button variant="secondary" size="small" onClick={handleRun}>
                                    ▶ Run
                                </Button>
                                <Button variant="success" size="small" onClick={handleSubmit}>
                                    Submit
                                </Button>
                            </div>
                        </div>
                        <textarea
                            className="code-editor"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            spellCheck={false}
                        />
                    </Card>

                    {output && (
                        <Card className="output-section">
                            <h4>Output</h4>
                            <pre className="output-content">{output}</pre>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CodingPractice;
