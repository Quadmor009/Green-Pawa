export default function ArcGauge({ percentage, remainingKwh, lastTopUpKwh, status }) {
  const cx = 140;
  const cy = 120;
  const r = 110;
  const strokeW = 14;

  const toRad = (deg) => (deg * Math.PI) / 180;
  const ptX = (deg) => cx + r * Math.cos(toRad(deg));
  const ptY = (deg) => cy - r * Math.sin(toRad(deg));

  const trackD = `M ${ptX(180)} ${ptY(180)} A ${r} ${r} 0 1 1 ${ptX(0)} ${ptY(0)}`;

  const fillEndDeg = 180 - percentage * 1.8;
  const fillD = percentage > 0
    ? `M ${ptX(180)} ${ptY(180)} A ${r} ${r} 0 0 1 ${ptX(fillEndDeg)} ${ptY(fillEndDeg)}`
    : '';

  const fillColor =
    percentage > 40 ? '#067034' :
    percentage > 20 ? '#D58206' :
    '#B50027';

  const isDisconnected = status === 'disconnected';
  const dotX = ptX(fillEndDeg);
  const dotY = ptY(fillEndDeg);

  return (
    <div style={{ width: 280, height: 132, margin: '0 auto', position: 'relative' }}>
      <svg viewBox="0 0 280 132" style={{ width: '100%', height: '100%', display: 'block' }}>
        {/* Track */}
        <path d={trackD} stroke="#E2DED7" strokeWidth={strokeW} fill="none" strokeLinecap="round" />

        {/* Fill */}
        {percentage > 0 && (
          <path d={fillD} stroke={fillColor} strokeWidth={strokeW} fill="none" strokeLinecap="round" />
        )}

        {/* Endpoint dot */}
        {percentage > 0 && (
          <circle cx={dotX} cy={dotY} r="6" fill={fillColor} />
        )}
      </svg>

      {/* Center text — absolutely positioned inside the arc */}
      <div style={{
        position: 'absolute',
        bottom: 25,
        left: 0,
        right: 0,
        textAlign: 'center',
      }}>
        <div style={{
          fontSize: isDisconnected ? 36 : 32,
          fontWeight: 700,
          color: isDisconnected ? '#B50027' : fillColor,
          fontFamily: 'Inter, sans-serif',
          lineHeight: 1,
        }}>
          {percentage}%
        </div>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 4,
          marginTop: 4,
          fontFamily: 'Inter, sans-serif',
          fontSize: 13,
        }}>
          <span style={{ fontWeight: 700, color: isDisconnected ? '#6B6860' : '#5258ED' }}>
            {remainingKwh}kWh
          </span>
          <span style={{ fontWeight: 400, color: '#6B6860' }}>out of</span>
          <span style={{ fontWeight: 700, color: '#6B6860' }}>{lastTopUpKwh} kWh</span>
        </div>
      </div>
    </div>
  );
}
