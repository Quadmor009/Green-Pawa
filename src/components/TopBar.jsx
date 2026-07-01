import { tenant } from '../data';

function BellButton() {
  return (
    <button
      style={{
        width: 48,
        height: 48,
        borderRadius: 8,
        background: '#5258ED',
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        padding: 0,
        outline: 'none',
      }}
      aria-label="Notifications"
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
      </svg>
    </button>
  );
}

export default function TopBar({ variant = 'home', showBell = true }) {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  if (variant === 'usage') {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '12px 24px',
        background: 'transparent',
      }}>
        <span style={{ fontSize: 24, fontWeight: 600, color: '#1A1814', letterSpacing: '-0.01em' }}>
          Usage
        </span>
        {showBell && <BellButton />}
      </div>
    );
  }

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '12px 24px',
      background: 'transparent',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <img
          src="/mascot.png"
          alt="Avatar"
          style={{
            width: 48,
            height: 48,
            borderRadius: '50%',
            objectFit: 'cover',
            flexShrink: 0,
          }}
        />
        <div>
          <div style={{ fontSize: 16, fontWeight: 600, color: '#1A1814' }}>
            {greeting}, {tenant.name}
          </div>
          <div style={{ fontSize: 13, fontWeight: 400, color: '#6B6860' }}>
            {tenant.apartment}
          </div>
        </div>
      </div>
      <BellButton />
    </div>
  );
}
