import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePower, MAX_BALANCE_KWH } from '../PowerContext';

const RATE = 85;

const presets = [
  { amount: 500, kwh: 5.9 },
  { amount: 1000, kwh: 11.8 },
  { amount: 2000, kwh: 23.5 },
  { amount: 5000, kwh: 58.8 },
];

function formatNaira(n) {
  return '₦' + n.toLocaleString();
}

function ProgressBars({ current, total = 3 }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', gap: 8 }}>
      {Array.from({ length: total }, (_, i) => (
        <div
          key={i}
          style={{
            width: 24,
            height: 4,
            borderRadius: 2,
            background: i < current ? '#5258ED' : '#EDE9E3',
          }}
        />
      ))}
    </div>
  );
}

export default function TopUp() {
  const navigate = useNavigate();
  const { power, topUp } = usePower();
  const [step, setStep] = useState(1);
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [customAmount, setCustomAmount] = useState('');

  const activeAmount = customAmount ? Number(customAmount) : selectedAmount;
  const activeKwh = activeAmount ? Number((activeAmount / RATE).toFixed(1)) : null;
  const estimatedHours = activeKwh ? Math.round(activeKwh * 0.76) : null;
  const wouldExceedMax = activeKwh && (power.remainingKwh + activeKwh) > MAX_BALANCE_KWH;
  const canContinue = activeAmount && activeAmount > 0 && !wouldExceedMax;

  const handlePay = () => {
    topUp(activeAmount, activeKwh);
    setStep(3);
  };

  // Step 1 — Amount
  if (step === 1) {
    return (
      <div className="page-content" style={{ paddingLeft: 24, paddingRight: 24, paddingBottom: 32, display: 'flex', flexDirection: 'column', gap: 24 }}>
        {/* Header */}
        <div style={{ padding: '12px 0 0' }}>
          <span style={{ fontSize: 24, fontWeight: 600, color: '#1A1814', letterSpacing: '-0.01em' }}>Top Up</span>
        </div>

        <ProgressBars current={1} />

        {/* Rate info */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6B6860" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="16" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12.01" y2="8" />
          </svg>
          <span style={{ fontSize: 14, fontWeight: 400, color: '#6B6860' }}>Current rate: ₦{RATE} per kWh</span>
        </div>

        {/* Amount grid */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
          {presets.map((p) => {
            const isSelected = selectedAmount === p.amount;
            return (
              <button
                key={p.amount}
                onClick={() => { setSelectedAmount(p.amount); setCustomAmount(String(p.amount)); }}
                style={{
                  flexBasis: 'calc(50% - 6px)',
                  borderRadius: 16,
                  padding: '20px 16px',
                  border: `1.5px solid ${isSelected ? '#5258ED' : '#E2DED7'}`,
                  background: isSelected ? '#E8EDFF' : '#FFFFFF',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 4,
                  boxShadow: 'none',
                  outline: 'none',
                }}
              >
                <span style={{ fontSize: 18, fontWeight: 600, color: isSelected ? '#5258ED' : '#1A1814' }}>
                  {formatNaira(p.amount)}
                </span>
                <span style={{ fontSize: 13, fontWeight: 400, color: '#6B6860' }}>
                  {p.kwh} kWh
                </span>
              </button>
            );
          })}
        </div>

        {/* Divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ flex: 1, height: 1, background: '#E2DED7' }} />
          <span style={{ fontSize: 13, fontWeight: 500, color: '#A09890', whiteSpace: 'nowrap' }}>or enter amount</span>
          <div style={{ flex: 1, height: 1, background: '#E2DED7' }} />
        </div>

        {/* Custom input */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <label style={{ fontSize: 14, fontWeight: 500, color: '#1A1814' }}>Amount</label>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            height: 52,
            borderRadius: 8,
            padding: '0 16px',
            background: '#FFFFFF',
            border: '1.5px solid #E2DED7',
          }}>
            <span style={{ fontSize: 16, fontWeight: 500, color: '#6B6860' }}>₦</span>
            <input
              type="number"
              value={customAmount}
              onChange={(e) => { setCustomAmount(e.target.value); setSelectedAmount(null); }}
              placeholder="0"
              style={{
                flex: 1,
                border: 'none',
                outline: 'none',
                fontSize: 16,
                fontWeight: 400,
                color: '#1A1814',
                fontFamily: 'Inter, sans-serif',
                background: 'transparent',
              }}
            />
          </div>
          {customAmount && Number(customAmount) > 0 && (
            <span style={{ fontSize: 13, fontWeight: 400, color: '#6B6860' }}>
              {formatNaira(Number(customAmount))} = {(Number(customAmount) / RATE).toFixed(1)} kWh
            </span>
          )}
          <span style={{ fontSize: 12, fontWeight: 400, color: '#A09890' }}>
            Max top-up: {Math.round((MAX_BALANCE_KWH - power.remainingKwh) * 10) / 10} kWh
          </span>
        </div>

        {/* Exceed warning */}
        {wouldExceedMax && (
          <div style={{
            background: '#FCEEF1',
            borderRadius: 12,
            padding: '12px 16px',
            fontSize: 13,
            fontWeight: 400,
            color: '#B50027',
          }}>
            This top-up would exceed the {MAX_BALANCE_KWH} kWh max balance. Choose a smaller amount or use some power first.
          </div>
        )}

        {/* Continue */}
        <button
          disabled={!canContinue}
          onClick={() => setStep(2)}
          style={{
            width: '100%',
            height: 52,
            borderRadius: 12,
            background: canContinue ? '#5258ED' : '#EDE9E3',
            color: canContinue ? '#fff' : '#A09890',
            fontSize: 16,
            fontWeight: 600,
            border: 'none',
            boxShadow: 'none',
            cursor: canContinue ? 'pointer' : 'default',
          }}
        >
          Continue
        </button>
      </div>
    );
  }

  // Step 2 — Payment
  if (step === 2) {
    return (
      <div className="page-content" style={{ paddingLeft: 24, paddingRight: 24, paddingBottom: 32, display: 'flex', flexDirection: 'column', gap: 24 }}>
        {/* Header with back button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0 0' }}>
          <button
            onClick={() => setStep(1)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, display: 'flex', alignItems: 'center' }}
            aria-label="Go back"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1A1814" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <span style={{ fontSize: 24, fontWeight: 600, color: '#1A1814', letterSpacing: '-0.01em' }}>Top Up</span>
        </div>

        <ProgressBars current={2} />

        {/* Order summary */}
        <div style={{
          background: '#FFFFFF',
          border: '1px solid #E2DED7',
          borderRadius: 16,
          padding: 20,
          boxShadow: 'none',
        }}>
          <div style={{
            fontSize: 14,
            fontWeight: 600,
            color: '#6B6860',
            textTransform: 'uppercase',
            letterSpacing: '0.02em',
            marginBottom: 16,
          }}>
            Order summary
          </div>
          {[
            { label: 'Amount', value: formatNaira(activeAmount) },
            { label: 'Units', value: `${activeKwh} kWh` },
          ].map((row) => (
            <div key={row.label} style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '12px 0',
            }}>
              <span style={{ fontSize: 15, fontWeight: 400, color: '#6B6860' }}>{row.label}</span>
              <span style={{ fontSize: 15, fontWeight: 600, color: '#1A1814' }}>{row.value}</span>
            </div>
          ))}
          <div style={{ height: 1, background: '#E2DED7' }} />
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '12px 0',
          }}>
            <span style={{ fontSize: 15, fontWeight: 400, color: '#6B6860' }}>Estimated hours</span>
            <span style={{ fontSize: 15, fontWeight: 600, color: '#1A1814' }}>~{estimatedHours} hours</span>
          </div>
        </div>

        {/* Payment method */}
        <div style={{
          background: '#FFFFFF',
          border: '1px solid #E2DED7',
          borderRadius: 16,
          padding: 20,
          boxShadow: 'none',
        }}>
          <div style={{
            fontSize: 14,
            fontWeight: 600,
            color: '#6B6860',
            textTransform: 'uppercase',
            letterSpacing: '0.02em',
            marginBottom: 16,
          }}>
            Payment method
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {/* Mastercard icon */}
            <div style={{
              width: 40,
              height: 28,
              borderRadius: 4,
              background: '#1A1F71',
              position: 'relative',
              overflow: 'hidden',
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <div style={{ position: 'absolute', left: 6, width: 16, height: 16, borderRadius: '50%', background: '#EB001B' }} />
              <div style={{ position: 'absolute', left: 14, width: 16, height: 16, borderRadius: '50%', background: '#F79E1B', opacity: 0.85 }} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 15, fontWeight: 500, color: '#1A1814' }}>Mastercard •••• 4521</div>
              <div style={{ fontSize: 13, fontWeight: 400, color: '#6B6860' }}>Expires 08/27</div>
            </div>
            <span style={{ fontSize: 18, color: '#A09890' }}>›</span>
          </div>

          <button style={{
            background: 'none',
            border: 'none',
            fontSize: 13,
            fontWeight: 500,
            color: '#5258ED',
            cursor: 'pointer',
            padding: 0,
            marginTop: 12,
          }}>
            Change card
          </button>

          <div style={{ height: 1, background: '#E2DED7', marginTop: 12 }} />

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 4,
            marginTop: 12,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#A09890" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <span style={{ fontSize: 12, fontWeight: 400, color: '#A09890' }}>Secured by Paystack Vault</span>
            </div>
            <span style={{ fontSize: 11, fontWeight: 400, color: '#A09890' }}>Card saved securely · PCI DSS compliant</span>
          </div>
        </div>

        {/* Pay section */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <button
            onClick={handlePay}
            style={{
              width: '100%',
              height: 52,
              borderRadius: 12,
              background: '#5258ED',
              color: '#fff',
              fontSize: 16,
              fontWeight: 600,
              border: 'none',
              boxShadow: 'none',
              cursor: 'pointer',
            }}
          >
            Pay {formatNaira(activeAmount)}
          </button>
          <p style={{ fontSize: 13, fontWeight: 400, color: '#A09890', textAlign: 'center' }}>
            Your power will reconnect automatically after payment
          </p>
        </div>
      </div>
    );
  }

  // Step 3 — Confirmation
  return (
    <div className="page-content" style={{
      paddingLeft: 24,
      paddingRight: 24,
      paddingBottom: 32,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: 610,
      gap: 24,
    }}>
      {/* Success icon */}
      <div style={{
        width: 64,
        height: 64,
        borderRadius: 100,
        background: '#E8F5EE',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#067034" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>

      {/* Success text */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
        <h1 style={{ fontSize: 24, fontWeight: 600, color: '#1A1814', letterSpacing: '-0.01em', textAlign: 'center', margin: 0 }}>
          You're back on
        </h1>
        <p style={{ fontSize: 15, fontWeight: 400, color: '#6B6860', textAlign: 'center', lineHeight: '150%', maxWidth: 253, margin: 0 }}>
          {formatNaira(activeAmount)} paid · {activeKwh} kWh added · Power reconnected
        </p>
      </div>

      {/* Balance card */}
      <div style={{
        background: '#FFFFFF',
        border: '1px solid #E2DED7',
        borderRadius: 16,
        padding: '20px 32px',
        boxShadow: 'none',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 4,
      }}>
        <span style={{ fontSize: 12, fontWeight: 500, color: '#6B6860' }}>New balance</span>
        <span style={{ fontSize: 28, fontWeight: 700, color: '#0D0B09', letterSpacing: '-0.02em' }}>{power.remainingKwh} kWh</span>
        <span style={{ fontSize: 13, fontWeight: 400, color: '#6B6860' }}>Approx. {power.hoursRemaining} hours</span>
      </div>

      {/* Done button */}
      <button
        onClick={() => navigate('/home')}
        style={{
          width: '100%',
          height: 52,
          borderRadius: 12,
          background: '#5258ED',
          color: '#fff',
          fontSize: 16,
          fontWeight: 600,
          border: 'none',
          boxShadow: 'none',
          cursor: 'pointer',
          alignSelf: 'stretch',
        }}
      >
        Done
      </button>
    </div>
  );
}
