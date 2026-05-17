import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Card from '../../components/shared/Card';
import Button from '../../components/shared/Button';
import './StaffProfile.css';

const StaffProfile = () => {
    const { user, updateProfile } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        department: user?.department || '',
        designation: user?.designation || '',
        subjects: user?.subjects || [],
        googleClassroomCode: user?.googleClassroomCode || ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        updateProfile(formData);
        setIsEditing(false);
    };

    return (
        <div className="staff-profile fade-in">
            <div className="profile-header">
                <h1>My Profile</h1>
                <Button
                    variant={isEditing ? 'success' : 'primary'}
                    onClick={() => setIsEditing(!isEditing)}
                >
                    {isEditing ? 'Cancel' : 'Edit Profile'}
                </Button>
            </div>

            <div className="profile-grid">
                <Card>
                    <h3>Personal Information</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Full Name</label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                disabled={!isEditing}
                            />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                value={formData.email}
                                disabled
                            />
                        </div>
                        <div className="form-group">
                            <label>Employee ID</label>
                            <input
                                type="text"
                                value={user?.employeeId}
                                disabled
                            />
                        </div>
                        <div className="form-group">
                            <label>Department</label>
                            <input
                                type="text"
                                value={formData.department}
                                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                                disabled={!isEditing}
                            />
                        </div>
                        <div className="form-group">
                            <label>Designation</label>
                            <input
                                type="text"
                                value={formData.designation}
                                onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                                disabled={!isEditing}
                            />
                        </div>
                        {isEditing && (
                            <Button type="submit" variant="success">Save Changes</Button>
                        )}
                    </form>
                </Card>

                <Card>
                    <h3>Teaching Details</h3>
                    <div className="teaching-info">
                        <div className="info-section">
                            <label>Subjects Teaching</label>
                            <div className="subjects-list">
                                {formData.subjects.map((subject, idx) => (
                                    <span key={idx} className="subject-tag">{subject}</span>
                                ))}
                            </div>
                        </div>

                        <div className="info-section">
                            <label>Google Classroom Code</label>
                            <div className="classroom-code">
                                <input
                                    type="text"
                                    value={formData.googleClassroomCode}
                                    onChange={(e) => setFormData({ ...formData, googleClassroomCode: e.target.value })}
                                    disabled={!isEditing}
                                    placeholder="Enter classroom code"
                                />
                                {!isEditing && formData.googleClassroomCode && (
                                    <Button variant="secondary" size="small">Copy Code</Button>
                                )}
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default StaffProfile;
