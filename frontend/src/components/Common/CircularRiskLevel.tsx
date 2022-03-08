import classNames from "classnames";
import { StyleCircularBadge } from "../Customers/styles";

interface CircularRiskLevelProps {
  risk_level: string;
  label: string;
}

const CircularRiskLevel: React.FC<CircularRiskLevelProps> = ({ risk_level, label }) => (
  <StyleCircularBadge>
    <div>
      <div
        className={classNames({
          red: risk_level === "high" || risk_level === "very_high",
          yellow: risk_level === "medium",
          green: risk_level === "low",
          "session-level": true,
        })}
      >
        {risk_level}
      </div>
      <div className="session-level-label">{label}</div>
    </div>
  </StyleCircularBadge>
);

export default CircularRiskLevel;
