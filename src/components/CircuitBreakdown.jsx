export default function CircuitBreakdown({ circuits }) {
  return (
    <div style={{
      background: '#FFFFFF',
      border: '1px solid #E2DED7',
      borderRadius: 16,
      padding: 20,
      boxShadow: 'none',
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <span style={{ fontSize: 14, fontWeight: 600, color: '#1A1814' }}>What's drawing power</span>
        <span style={{
          display: 'flex',
          alignItems: 'center',
          gap: 4,
          fontSize: 12,
          fontWeight: 400,
          color: '#5258ED',
        }}>
          <span style={{
            width: 6,
            height: 6,
            borderRadius: '50%',
            background: '#5258ED',
          }} />
          Right now
        </span>
      </div>

      {/* Segmented bar */}
      <div style={{
        display: 'flex',
        height: 10,
        marginTop: 16,
        gap: 2,
      }}>
        {circuits.map((c, i) => (
          <div
            key={c.name}
            style={{
              width: `${c.pct}%`,
              background: c.color,
              borderRadius: 2,
            }}
          />
        ))}
      </div>

      {/* Legend — 2x2 grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        columnGap: 12,
        rowGap: 10,
        marginTop: 16,
      }}>
        {circuits.map((c) => (
          <div key={c.name} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
            <span style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: c.color,
              flexShrink: 0,
              marginTop: 3,
            }} />
            <div>
              <div style={{ fontSize: 12, fontWeight: 500, color: '#1A1814' }}>{c.name}</div>
              <div style={{ fontSize: 12, fontWeight: 400, color: '#6B6860' }}>{c.kw} kW</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
