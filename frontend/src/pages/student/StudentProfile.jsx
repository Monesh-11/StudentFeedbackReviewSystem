import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Card from '../../components/shared/Card';
import Button from '../../components/shared/Button';
import ProgressBar from '../../components/shared/ProgressBar';
import './StudentProfile.css';

const StudentProfile = () => {
    const { user, updateProfile } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        department: user?.department || '',
        year: user?.year || '',
        skills: user?.skills || [],
        links: user?.links || {}
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        updateProfile(formData);
        setIsEditing(false);
    };

    const handleResumeUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            // In a real app, this would upload to a server
            alert(`Resume uploaded: ${file.name}`);
        }
    };

    return (
        <div className="student-profile fade-in">
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
                {/* Personal Information */}
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
                            <label>Roll Number</label>
                            <input
                                type="text"
                                value={user?.rollNumber}
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
                            <label>Year</label>
                            <input
                                type="number"
                                value={formData.year}
                                onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                                disabled={!isEditing}
                            />
                        </div>
                        {isEditing && (
                            <Button type="submit" variant="success">Save Changes</Button>
                        )}
                    </form>
                </Card>

                {/* Resume Upload */}
                <Card>
                    <h3>Resume</h3>
                    <div className="resume-upload">
                        <div className="upload-area">
                            <div className="upload-icon">📄</div>
                            <p>Upload your resume (PDF, DOC, DOCX)</p>
                            <input
                                type="file"
                                id="resume"
                                accept=".pdf,.doc,.docx"
                                onChange={handleResumeUpload}
                                style={{ display: 'none' }}
                            />
                            <label htmlFor="resume">
                                <Button variant="primary">Choose File</Button>
                            </label>
                        </div>
                        {user?.resume && (
                            <div className="uploaded-file">
                                <span>✓ {user.resume}</span>
                                <Button variant="danger" size="small">Remove</Button>
                            </div>
                        )}
                    </div>
                </Card>

                {/* Skills */}
                <Card>
                    <h3>Skills & Proficiency</h3>
                    <div className="skills-list">
                        {user?.skills?.map((skill, index) => (
                            <div key={index} className="skill-item">
                                <ProgressBar
                                    label={skill.name}
                                    progress={skill.level}
                                    color="var(--student-gradient)"
                                />
                            </div>
                        ))}
                    </div>
                </Card>

                {/* Social Links */}
                <Card>
                    <h3>Social & Portfolio Links</h3>
                    <div className="links-section">
                        <div className="form-group">
                            <label>🔗 GitHub</label>
                            <input
                                type="url"
                                value={formData.links?.github || ''}
                                onChange={(e) => setFormData({
                                    ...formData,
                                    links: { ...formData.links, github: e.target.value }
                                })}
                                disabled={!isEditing}
                                placeholder="https://github.com/username"
                            />
                        </div>
                        <div className="form-group">
                            <label>💼 LinkedIn</label>
                            <input
                                type="url"
                                value={formData.links?.linkedin || ''}
                                onChange={(e) => setFormData({
                                    ...formData,
                                    links: { ...formData.links, linkedin: e.target.value }
                                })}
                                disabled={!isEditing}
                                placeholder="https://linkedin.com/in/username"
                            />
                        </div>
                        <div className="form-group">
                            <label>🌐 Portfolio</label>
                            <input
                                type="url"
                                value={formData.links?.portfolio || ''}
                                onChange={(e) => setFormData({
                                    ...formData,
                                    links: { ...formData.links, portfolio: e.target.value }
                                })}
                                disabled={!isEditing}
                                placeholder="https://yourportfolio.com"
                            />
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default StudentProfile;
