import { useState } from 'react';
import Card from '../../components/shared/Card';
import Button from '../../components/shared/Button';
import Modal from '../../components/shared/Modal';
import { allUsers } from '../../data/dummyData';
import './UserManagement.css';

const UserManagement = () => {
    const [users, setUsers] = useState(allUsers);
    const [filter, setFilter] = useState('all');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const filteredUsers = filter === 'all'
        ? users
        : users.filter(u => u.role === filter);

    return (
        <div className="user-management fade-in">
            <div className="page-header">
                <h1>User Management 👥</h1>
                <Button variant="primary" onClick={() => setIsModalOpen(true)}>
                    + Add User
                </Button>
            </div>

            <Card>
                <div className="filter-section">
                    <div className="filter-buttons">
                        <button
                            className={filter === 'all' ? 'active' : ''}
                            onClick={() => setFilter('all')}
                        >
                            All ({users.length})
                        </button>
                        <button
                            className={filter === 'student' ? 'active' : ''}
                            onClick={() => setFilter('student')}
                        >
                            Students ({users.filter(u => u.role === 'student').length})
                        </button>
                        <button
                            className={filter === 'staff' ? 'active' : ''}
                            onClick={() => setFilter('staff')}
                        >
                            Staff ({users.filter(u => u.role === 'staff').length})
                        </button>
                        <button
                            className={filter === 'admin' ? 'active' : ''}
                            onClick={() => setFilter('admin')}
                        >
                            Admin ({users.filter(u => u.role === 'admin').length})
                        </button>
                    </div>
                    <input
                        type="search"
                        placeholder="Search users..."
                        className="search-input"
                    />
                </div>

                <div className="users-table-container">
                    <table className="users-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Department</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.map(user => (
                                <tr key={user.id}>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        <span className={`role-badge ${user.role}`}>
                                            {user.role.toUpperCase()}
                                        </span>
                                    </td>
                                    <td>{user.department || user.designation || '-'}</td>
                                    <td>
                                        <span className={`status-badge ${user.status}`}>
                                            {user.status}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="action-buttons">
                                            <button className="action-btn edit">Edit</button>
                                            <button className="action-btn delete">Delete</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New User">
                <form className="user-form">
                    <div className="form-group">
                        <label>Full Name</label>
                        <input type="text" placeholder="Enter full name" required />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" placeholder="Enter email" required />
                    </div>
                    <div className="form-group">
                        <label>Role</label>
                        <select required>
                            <option value="">Select role</option>
                            <option value="student">Student</option>
                            <option value="staff">Staff</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Department</label>
                        <input type="text" placeholder="Enter department" />
                    </div>
                    <div className="modal-actions">
                        <Button type="button" variant="secondary" onClick={() => setIsModalOpen(false)}>
                            Cancel
                        </Button>
                        <Button type="submit" variant="success">
                            Add User
                        </Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default UserManagement;
