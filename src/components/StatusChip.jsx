const config = {
  active:       { label: 'Active',       color: '#1A8B4E', bg: '#E8F5EE' },
  low:          { label: 'Low balance',  color: '#B50027', bg: '#FCEEF1' },
  disconnected: { label: 'Disconnected', color: '#B50027', bg: '#FCEEF1' },
};

export default function StatusChip({ status }) {
  const { label, color, bg } = config[status] || config.active;

  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      padding: '4px 12px',
      borderRadius: 100,
      background: bg,
      fontSize: 12,
      fontWeight: 500,
      color,
    }}>
      <span style={{
        width: 8,
        height: 8,
        borderRadius: '50%',
        background: color,
        flexShrink: 0,
      }} />
      {label}
    </span>
  );
}
