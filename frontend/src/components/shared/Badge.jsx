import './Badge.css';

const Badge = ({ icon, name, description, color, earned, size = 'medium' }) => {
    return (
        <div className={`badge badge-${size} ${earned ? 'badge-earned' : 'badge-locked'}`}>
            <div className="badge-icon" style={{ background: earned ? color : '#333' }}>
                {icon}
            </div>
            <div className="badge-info">
                <h4>{name}</h4>
                <p>{description}</p>
            </div>
            {earned && <div className="badge-checkmark">✓</div>}
        </div>
    );
};

export default Badge;
