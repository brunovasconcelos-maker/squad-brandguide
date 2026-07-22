import warningIcon from "../../../assets/icons/Warning.svg";

export default function FailBadge() {
  return (
    <div className="fail-badge">
      <img className="fail-badge__icon" src={warningIcon} alt="" />
      <p className="fail-badge__label">Fail</p>
    </div>
  );
}
