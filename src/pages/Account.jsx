import { useState } from 'react';

export default function Account() {
  const [lowBalanceAlert, setLowBalanceAlert] = useState(true);
  const [paymentConfirmation, setPaymentConfirmation] = useState(true);

  function Toggle({ value, onChange }) {
    return (
      <button
        onClick={onChange}
        style={{
          width: 48,
          height: 28,
          borderRadius: 14,
          background: value ? '#5258ED' : '#EDE9E3',
          border: 'none',
          cursor: 'pointer',
          position: 'relative',
          transition: 'background 0.15s ease',
          flexShrink: 0,
        }}
        aria-label="Toggle"
      >
        <div style={{
          width: 22,
          height: 22,
          borderRadius: '50%',
          background: '#fff',
          position: 'absolute',
          top: 3,
          left: value ? 23 : 3,
          transition: 'left 0.15s ease',
          boxShadow: 'none',
        }} />
      </button>
    );
  }

  return (
    <div className="page-content">
      {/* Header */}
      <div style={{ padding: '12px 24px 0' }}>
        <span style={{ fontSize: 24, fontWeight: 600, color: '#1A1814', letterSpacing: '-0.01em' }}>
          Account
        </span>
      </div>

      {/* Profile row */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '20px 24px',
      }}>
        <img
          src="/mascot.png"
          alt="Avatar"
          style={{
            width: 56,
            height: 56,
            borderRadius: '50%',
            objectFit: 'cover',
            flexShrink: 0,
          }}
        />
        <div>
          <div style={{ fontSize: 16, fontWeight: 600, color: '#1A1814' }}>Adebayo Okonkwo</div>
          <div style={{ fontSize: 13, fontWeight: 400, color: '#6B6860' }}>Apt 4B</div>
        </div>
      </div>

      {/* PAYMENT METHODS */}
      <div style={{ padding: '0 24px' }}>
        <div style={{
          fontSize: 11,
          fontWeight: 600,
          color: '#A09890',
          letterSpacing: '0.1em',
          marginTop: 8,
          marginBottom: 12,
        }}>
          PAYMENT METHODS
        </div>

        {/* Card row */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '12px 0',
          cursor: 'pointer',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 40,
              height: 28,
              borderRadius: 6,
              background: '#1A237E',
              position: 'relative',
              overflow: 'hidden',
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <div style={{
                position: 'absolute',
                left: 8,
                width: 16,
                height: 16,
                borderRadius: '50%',
                background: '#EB001B',
              }} />
              <div style={{
                position: 'absolute',
                left: 16,
                width: 16,
                height: 16,
                borderRadius: '50%',
                background: '#F79E1B',
                opacity: 0.85,
              }} />
            </div>
            <span style={{ fontSize: 15, fontWeight: 500, color: '#1A1814' }}>•••• 4521</span>
          </div>
          <span style={{ fontSize: 18, color: '#A09890' }}>›</span>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: '#E2DED7' }} />

        {/* Add new card */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '14px 0',
          cursor: 'pointer',
        }}>
          <span style={{ fontSize: 18, fontWeight: 400, color: '#5258ED' }}>+</span>
          <span style={{ fontSize: 15, fontWeight: 500, color: '#5258ED' }}>Add new card</span>
        </div>
      </div>

      {/* NOTIFICATIONS */}
      <div style={{ padding: '0 24px' }}>
        <div style={{
          fontSize: 11,
          fontWeight: 600,
          color: '#A09890',
          letterSpacing: '0.1em',
          marginTop: 20,
          marginBottom: 12,
        }}>
          NOTIFICATIONS
        </div>

        {/* Low balance alert */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '12px 0',
        }}>
          <div>
            <div style={{ fontSize: 15, fontWeight: 600, color: '#1A1814' }}>Low balance alert</div>
            <div style={{ fontSize: 12, fontWeight: 400, color: '#6B6860', marginTop: 2 }}>
              Notify when balance drops below 20%
            </div>
          </div>
          <Toggle value={lowBalanceAlert} onChange={() => setLowBalanceAlert(!lowBalanceAlert)} />
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: '#E2DED7' }} />

        {/* Payment confirmation */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '12px 0',
        }}>
          <div>
            <div style={{ fontSize: 15, fontWeight: 600, color: '#1A1814' }}>Payment confirmation</div>
            <div style={{ fontSize: 12, fontWeight: 400, color: '#6B6860', marginTop: 2 }}>
              Notify after each successful top-up
            </div>
          </div>
          <Toggle value={paymentConfirmation} onChange={() => setPaymentConfirmation(!paymentConfirmation)} />
        </div>
      </div>

      {/* SUPPORT */}
      <div style={{ padding: '0 24px' }}>
        <div style={{
          fontSize: 11,
          fontWeight: 600,
          color: '#A09890',
          letterSpacing: '0.1em',
          marginTop: 20,
          marginBottom: 12,
        }}>
          SUPPORT
        </div>

        {/* Contact landlord */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '14px 0',
          cursor: 'pointer',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6B6860" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            <span style={{ fontSize: 15, fontWeight: 500, color: '#1A1814' }}>Contact landlord</span>
          </div>
          <span style={{ fontSize: 18, color: '#A09890' }}>›</span>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: '#E2DED7' }} />

        {/* Help & FAQ */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '14px 0',
          cursor: 'pointer',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6B6860" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
            <span style={{ fontSize: 15, fontWeight: 500, color: '#1A1814' }}>Help & FAQ</span>
          </div>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#A09890" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
        </div>
      </div>

      {/* Sign out */}
      <div style={{ padding: '24px 24px 20px' }}>
        <button style={{
          background: 'none',
          border: 'none',
          fontSize: 15,
          fontWeight: 600,
          color: '#B50027',
          cursor: 'pointer',
          padding: 0,
          minHeight: 44,
        }}>
          Sign out
        </button>
      </div>
    </div>
  );
}
