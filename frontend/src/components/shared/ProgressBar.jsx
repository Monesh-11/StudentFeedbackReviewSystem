import './ProgressBar.css';

const ProgressBar = ({ progress, label, color, showPercentage = true }) => {
    return (
        <div className="progress-container">
            {label && (
                <div className="progress-label">
                    <span>{label}</span>
                    {showPercentage && <span>{progress}%</span>}
                </div>
            )}
            <div className="progress-bar">
                <div
                    className="progress-fill"
                    style={{
                        width: `${progress}%`,
                        background: color || 'var(--primary-gradient)'
                    }}
                >
                    <div className="progress-shine"></div>
                </div>
            </div>
        </div>
    );
};

export default ProgressBar;
