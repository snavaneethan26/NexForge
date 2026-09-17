import { Link } from 'react-router-dom';

export default function EmptyState({ icon, title, message, actionLabel, actionTo }) {
  return (
    <div className="empty">
      {icon && <span className="empty-icon">{icon}</span>}
      <h2>{title}</h2>
      <p>{message}</p>
      {actionLabel && actionTo && (
        <Link to={actionTo} className="btn btn-primary">{actionLabel}</Link>
      )}
    </div>
  );
}
