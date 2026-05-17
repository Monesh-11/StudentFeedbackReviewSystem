import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/shared/Button';
import './Login.css'; // Reusing Login styles for consistency

const Register = () => {
    const navigate = useNavigate();
    const { register } = useAuth();

    // Form state
    const [step, setStep] = useState(1);
    const [role, setRole] = useState('STUDENT');
    const [error, setError] = useState('');

    // Common fields
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Student fields
    const [rollNumber, setRollNumber] = useState('');
    const [department, setDepartment] = useState('');
    const [year, setYear] = useState('1');
    const [semester, setSemester] = useState('1');

    // Staff fields
    const [employeeId, setEmployeeId] = useState('');
    const [designation, setDesignation] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const userData = {
            name,
            email,
            password,
            role
        };

        if (role === 'STUDENT') {
            userData.rollNumber = rollNumber;
            userData.department = department;
            userData.year = parseInt(year);
            userData.semester = parseInt(semester);
        } else if (role === 'STAFF') {
            userData.employeeId = employeeId;
            userData.department = department;
            userData.designation = designation;
        }

        const result = await register(userData);

        if (result.success) {
            // Redirect based on role
            switch (result.user.role) {
                case 'STUDENT':
                    navigate('/student/dashboard');
                    break;
                case 'STAFF':
                    navigate('/staff/dashboard');
                    break;
                case 'ADMIN':
                    navigate('/admin/dashboard');
                    break;
                default:
                    navigate('/');
            }
        } else {
            setError(result.message);
        }
    };

    return (
        <div className="login-page">
            <div className="login-background"></div>

            <div className="login-container">
                <div className="login-card">
                    <div className="login-header">
                        <h1 className="gradient-text">Create Account</h1>
                        <p>Join EduHub today</p>
                    </div>

                    <form onSubmit={handleSubmit} className="login-form">
                        {step === 1 && (
                            <>
                                <div className="form-group">
                                    <label>I am a</label>
                                    <div className="role-selector">
                                        <div
                                            className={`role-option ${role === 'STUDENT' ? 'selected' : ''}`}
                                            onClick={() => setRole('STUDENT')}
                                        >
                                            Student
                                        </div>
                                        <div
                                            className={`role-option ${role === 'STAFF' ? 'selected' : ''}`}
                                            onClick={() => setRole('STAFF')}
                                        >
                                            Staff
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label>Full Name</label>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="John Doe"
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Email</label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="email@example.com"
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Password</label>
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Create a password"
                                        required
                                    />
                                </div>

                                <Button
                                    type="button"
                                    variant="primary"
                                    size="large"
                                    className="login-btn"
                                    onClick={() => setStep(2)}
                                >
                                    Next
                                </Button>
                            </>
                        )}

                        {step === 2 && (
                            <>
                                {role === 'STUDENT' && (
                                    <>
                                        <div className="form-group">
                                            <label>Roll Number</label>
                                            <input
                                                type="text"
                                                value={rollNumber}
                                                onChange={(e) => setRollNumber(e.target.value)}
                                                placeholder="e.g., CS2024001"
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Department</label>
                                            <input
                                                type="text"
                                                value={department}
                                                onChange={(e) => setDepartment(e.target.value)}
                                                placeholder="e.g., Computer Science"
                                                required
                                            />
                                        </div>
                                        <div className="form-row">
                                            <div className="form-group">
                                                <label>Year</label>
                                                <select value={year} onChange={(e) => setYear(e.target.value)}>
                                                    <option value="1">1</option>
                                                    <option value="2">2</option>
                                                    <option value="3">3</option>
                                                    <option value="4">4</option>
                                                </select>
                                            </div>
                                            <div className="form-group">
                                                <label>Semester</label>
                                                <select value={semester} onChange={(e) => setSemester(e.target.value)}>
                                                    <option value="1">1</option>
                                                    <option value="2">2</option>
                                                    <option value="3">3</option>
                                                    <option value="4">4</option>
                                                    <option value="5">5</option>
                                                    <option value="6">6</option>
                                                    <option value="7">7</option>
                                                    <option value="8">8</option>
                                                </select>
                                            </div>
                                        </div>
                                    </>
                                )}

                                {role === 'STAFF' && (
                                    <>
                                        <div className="form-group">
                                            <label>Employee ID</label>
                                            <input
                                                type="text"
                                                value={employeeId}
                                                onChange={(e) => setEmployeeId(e.target.value)}
                                                placeholder="e.g., EMP101"
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Department</label>
                                            <input
                                                type="text"
                                                value={department}
                                                onChange={(e) => setDepartment(e.target.value)}
                                                placeholder="e.g., Computer Science"
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Designation</label>
                                            <input
                                                type="text"
                                                value={designation}
                                                onChange={(e) => setDesignation(e.target.value)}
                                                placeholder="e.g., Assistant Professor"
                                                required
                                            />
                                        </div>
                                    </>
                                )}

                                {error && <div className="error-message">{error}</div>}

                                <div className="button-group">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => setStep(1)}
                                    >
                                        Back
                                    </Button>
                                    <Button
                                        type="submit"
                                        variant="primary"
                                    >
                                        Register
                                    </Button>
                                </div>
                            </>
                        )}
                    </form>

                    <div className="login-footer">
                        <p>Already have an account? <Link to="/login">Login</Link></p>
                    </div>
                </div>
            </div>

            <style>{`
                .role-selector {
                    display: flex;
                    gap: 1rem;
                }
                .role-option {
                    flex: 1;
                    padding: 0.75rem;
                    text-align: center;
                    border: 1px solid #e2e8f0;
                    border-radius: 0.5rem;
                    cursor: pointer;
                    transition: all 0.2s;
                }
                .role-option.selected {
                    background-color: #6366f1;
                    color: white;
                    border-color: #6366f1;
                }
                .form-row {
                    display: flex;
                    gap: 1rem;
                }
                .button-group {
                    display: flex;
                    gap: 1rem;
                    margin-top: 1rem;
                }
                .button-group button {
                    flex: 1;
                }
            `}</style>
        </div>
    );
};

export default Register;
