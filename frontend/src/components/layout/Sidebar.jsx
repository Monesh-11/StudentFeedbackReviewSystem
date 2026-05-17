import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Sidebar.css';

const Sidebar = () => {
    const { user } = useAuth();

    const studentLinks = [
        { path: '/student/dashboard', icon: '📊', label: 'Dashboard' },
        { path: '/student/profile', icon: '👤', label: 'Profile' },
        { path: '/student/roadmap', icon: '🗺️', label: 'Roadmap' },
        { path: '/student/practice', icon: '💻', label: 'Coding Practice' },
        { path: '/student/tests', icon: '📝', label: 'Tests' },
        { path: '/student/results', icon: '📈', label: 'Results' },
        { path: '/student/feedback', icon: '💬', label: 'Feedback' }
    ];

    const staffLinks = [
        { path: '/staff/dashboard', icon: '📊', label: 'Dashboard' },
        { path: '/staff/profile', icon: '👤', label: 'Profile' },
        { path: '/staff/create-test', icon: '➕', label: 'Create Test' },
        { path: '/staff/test-results', icon: '📈', label: 'Test Results' }
    ];

    const adminLinks = [
        { path: '/admin/dashboard', icon: '📊', label: 'Dashboard' },
        { path: '/admin/users', icon: '👥', label: 'User Management' },
        { path: '/admin/feedback', icon: '💬', label: 'Feedback Management' }
    ];

    const getLinks = () => {
        switch (user?.role) {
            case 'student': return studentLinks;
            case 'staff': return staffLinks;
            case 'admin': return adminLinks;
            default: return [];
        }
    };

    return (
        <aside className="sidebar">
            <nav className="sidebar-nav">
                {getLinks().map((link) => (
                    <NavLink
                        key={link.path}
                        to={link.path}
                        className={({ isActive }) =>
                            `sidebar-link ${isActive ? 'active' : ''}`
                        }
                    >
                        <span className="sidebar-icon">{link.icon}</span>
                        <span className="sidebar-label">{link.label}</span>
                    </NavLink>
                ))}
            </nav>
        </aside>
    );
};

export default Sidebar;
