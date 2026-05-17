import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
    const { user, logout } = useAuth();

    const getRoleColor = () => {
        switch (user?.role) {
            case 'student': return 'var(--accent-blue)';
            case 'staff': return 'var(--accent-purple)';
            case 'admin': return 'var(--accent-pink)';
            default: return 'var(--accent-purple)';
        }
    };

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <h2 className="gradient-text">EduHub</h2>
            </div>

            <div className="navbar-user">
                <div className="user-info">
                    <div className="user-avatar" style={{ background: getRoleColor() }}>
                        {user?.name?.charAt(0).toUpperCase()}
                    </div>
                    <div className="user-details">
                        <div className="user-name">{user?.name}</div>
                        <div className="user-role" style={{ color: getRoleColor() }}>
                            {user?.role?.toUpperCase()}
                        </div>
                    </div>
                </div>
                <button className="logout-btn" onClick={logout}>
                    Logout
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
