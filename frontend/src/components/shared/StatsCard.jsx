import './StatsCard.css';

const StatsCard = ({ icon, label, value, color, trend }) => {
    return (
        <div className="stats-card">
            <div className="stats-icon" style={{ background: color }}>
                {icon}
            </div>
            <div className="stats-content">
                <div className="stats-value">{value}</div>
                <div className="stats-label">{label}</div>
                {trend && (
                    <div className={`stats-trend ${trend > 0 ? 'trend-up' : 'trend-down'}`}>
                        {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
                    </div>
                )}
            </div>
        </div>
    );
};

export default StatsCard;
