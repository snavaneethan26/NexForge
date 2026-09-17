import { formatSpecificationKey } from '../utils/formatSpecificationKey.js';

function formatValue(value) {
  if (Array.isArray(value)) return value.join(', ');
  if (typeof value === 'boolean') return value ? 'Yes' : 'No';
  return String(value);
}

export default function SpecificationsTable({ specifications }) {
  const entries = Object.entries(specifications || {});
  if (entries.length === 0) return <p style={{ color: '#64748b' }}>No specifications available.</p>;
  return (
    <table className="spec-table">
      <tbody>
        {entries.map(([key, value]) => (
          <tr key={key}>
            <th scope="row">{formatSpecificationKey(key)}</th>
            <td>{formatValue(value)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
