import { useNavigate } from 'react-router-dom';
import TopBar from '../components/TopBar';
import StatusChip from '../components/StatusChip';
import ArcGauge from '../components/ArcGauge';
import { usePower } from '../PowerContext';

export default function Home() {
  const navigate = useNavigate();
  const { power: powerStatus, payments } = usePower();
  const isActive = powerStatus.state === 'active';
  const isLow = powerStatus.percentage <= 30;

  return (
    <div className="page-content">
      <TopBar />

      {/* 1. Status chip — ABOVE gauge */}
      <div style={{ textAlign: 'center', marginTop: 8 }}>
        {isActive ? (
          <StatusChip status={isLow ? 'low' : 'active'} />
        ) : (
          <StatusChip status="disconnected" />
        )}
      </div>

      {/* 2. Arc gauge */}
      <div style={{ padding: '12px 20px 0' }}>
        <ArcGauge
          percentage={isActive ? powerStatus.percentage : 0}
          remainingKwh={isActive ? powerStatus.remainingKwh : 0}
          lastTopUpKwh={powerStatus.lastTopUpKwh}
          hoursRemaining={powerStatus.hoursRemaining}
          status={powerStatus.state}
        />
      </div>

      {/* 3. Hours remaining */}
      {isActive && (
        <div style={{
          textAlign: 'center',
          fontSize: 14,
          fontWeight: 400,
          color: '#6B6860',
          marginTop: 8,
        }}>
          Approx. {powerStatus.hoursRemaining} hours remaining
        </div>
      )}

      {/* 4. Current draw — wrapped in card */}
      {isActive && (
        <div style={{
          margin: '16px 16px 0',
          background: '#FFFFFF',
          border: '1px solid #E3DED7',
          borderRadius: 16,
          padding: 16,
          boxShadow: 'none',
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <span style={{ fontSize: 14, fontWeight: 500, color: '#20246A' }}>
              Current draw
            </span>
            <span style={{ fontSize: 14, fontWeight: 500, color: '#20246A' }}>
              {powerStatus.currentDrawKw} kW
            </span>
          </div>
          <div style={{
            width: '100%',
            height: 4,
            borderRadius: 2,
            background: '#EDE9E3',
            marginTop: 8,
          }}>
            <div style={{
              width: '35%',
              height: '100%',
              borderRadius: 2,
              background: '#5258ED',
            }} />
          </div>
          <div style={{
            textAlign: 'center',
            fontSize: 12,
            fontWeight: 400,
            color: '#A09890',
            marginTop: 6,
          }}>
            At current draw · est. ₦{Math.round(powerStatus.currentDrawKw * (24 - new Date().getHours()) * 85)} today
          </div>
        </div>
      )}

      {/* 5. Top up button */}
      <div style={{ padding: '20px 16px 0' }}>
        <button
          onClick={() => navigate('/topup')}
          style={{
            width: '100%',
            height: 52,
            borderRadius: 12,
            background: isActive ? '#5258ED' : '#B50027',
            color: '#fff',
            fontSize: 16,
            fontWeight: 600,
            border: 'none',
            boxShadow: 'none',
            cursor: 'pointer',
            transition: 'background 0.15s ease',
          }}
        >
          {isActive ? 'Top up' : 'Top up now'}
        </button>
      </div>

      {/* 6. Stat cards */}
      <div style={{
        display: 'flex',
        padding: '16px 16px 0',
        gap: 12,
      }}>
        <div style={{
          flex: 1,
          background: '#FFFFFF',
          border: '1px solid #E2DED7',
          borderRadius: 16,
          padding: 16,
          boxShadow: 'none',
        }}>
          <div style={{ fontSize: 12, fontWeight: 500, color: '#20246A' }}>This week</div>
          <div style={{ fontSize: 20, fontWeight: 600, color: '#20246A', letterSpacing: '-0.01em', marginTop: 4 }}>42.3 kWh</div>
          <div style={{ fontSize: 12, fontWeight: 400, color: '#A09890', marginTop: 2 }}>consumed</div>
        </div>
        <div style={{
          flex: 1,
          background: '#FFFFFF',
          border: '1px solid #E2DED7',
          borderRadius: 16,
          padding: 16,
          boxShadow: 'none',
        }}>
          <div style={{ fontSize: 12, fontWeight: 500, color: '#20246A' }}>Last top-up</div>
          <div style={{ fontSize: 20, fontWeight: 600, color: '#20246A', letterSpacing: '-0.01em', marginTop: 4 }}>₦{payments[0]?.amount.toLocaleString()}</div>
          <div style={{ fontSize: 12, fontWeight: 400, color: '#A09890', marginTop: 2 }}>{payments[0]?.date}</div>
        </div>
      </div>

      {/* 7. Running low banner */}
      {isActive && isLow && (
        <div style={{
          margin: '20px 16px 0',
          background: '#FCEEF1',
          borderLeft: '3px solid #B50027',
          borderRadius: 12,
          padding: 16,
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <img src="/warning.png" alt="Warning" style={{ width: 16, height: 16 }} />
              <span style={{ fontSize: 14, fontWeight: 600, color: '#B50027' }}>Running low</span>
            </div>
            <button
              onClick={() => navigate('/topup')}
              style={{
                background: 'none',
                border: 'none',
                fontSize: 13,
                fontWeight: 600,
                color: '#B50027',
                cursor: 'pointer',
                padding: 0,
              }}
            >
              Top up now
            </button>
          </div>
          <div style={{
            fontSize: 13,
            fontWeight: 400,
            color: '#6B6860',
            marginTop: 4,
          }}>
            Top up before you run out.
          </div>
        </div>
      )}

      {/* Disconnected message */}
      {!isActive && (
        <div style={{
          textAlign: 'center',
          fontSize: 13,
          fontWeight: 400,
          color: '#6B6860',
          padding: '12px 16px 0',
        }}>
          Top up to reconnect automatically. No action needed from your landlord.
        </div>
      )}
    </div>
  );
}
