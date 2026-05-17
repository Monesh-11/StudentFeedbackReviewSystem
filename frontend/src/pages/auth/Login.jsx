import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/shared/Button';
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const result = await login(email, password);

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

    const quickLogin = (role) => {
        const credentials = {
            student: { email: 'student@example.com', password: 'student123' },
            staff: { email: 'staff@example.com', password: 'staff123' },
            admin: { email: 'admin@example.com', password: 'admin123' }
        };

        setEmail(credentials[role].email);
        setPassword(credentials[role].password);
    };

    return (
        <div className="login-page">
            <div className="login-background"></div>

            <div className="login-container">
                <div className="login-card">
                    <div className="login-header">
                        <h1 className="gradient-text">EduHub</h1>
                        <p>Student Feedback & Learning Management System</p>
                    </div>

                    <form onSubmit={handleSubmit} className="login-form">
                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                required
                            />
                        </div>

                        {error && <div className="error-message">{error}</div>}

                        <Button type="submit" variant="primary" size="large" className="login-btn">
                            Login
                        </Button>
                    </form>

                    <div className="quick-login">
                        <p>Quick Login (Demo)</p>
                        <div className="quick-login-buttons">
                            <Button variant="outline" onClick={() => quickLogin('student')}>
                                Student
                            </Button>
                            <Button variant="outline" onClick={() => quickLogin('staff')}>
                                Staff
                            </Button>
                            <Button variant="outline" onClick={() => quickLogin('admin')}>
                                Admin
                            </Button>
                        </div>
                    </div>

                    <div className="login-credentials">
                        <p><strong>Demo Credentials:</strong></p>
                        <p>Student: student@example.com / student123</p>
                        <p>Staff: staff@example.com / staff123</p>
                        <p>Admin: admin@example.com / admin123</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
