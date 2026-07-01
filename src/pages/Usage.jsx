import { useState } from 'react';
import TopBar from '../components/TopBar';
import BarChartComponent from '../components/BarChart';
import CircuitBreakdown from '../components/CircuitBreakdown';
import { usageData, circuits } from '../data';
import { usePower } from '../PowerContext';

const filterMap = {
  '7D': { key: 'week', label: 'This week' },
  '30D': { key: 'month', label: 'This month' },
  '3M': { key: 'threeMonth', label: 'Last 3 months' },
  '6M': { key: 'sixMonth', label: 'Last 6 months' },
};

const filters = ['7D', '30D', '3M', '6M'];

export default function Usage() {
  const { power: powerStatus, payments } = usePower();
  const [activeFilter, setActiveFilter] = useState('7D');
  const [activeTab, setActiveTab] = useState('consumption');

  const currentData = usageData[filterMap[activeFilter].key];
  const totalKwh = currentData.reduce((sum, d) => sum + d.kwh, 0);
  const avgKwh = (totalKwh / currentData.length).toFixed(1);

  return (
    <div className="page-content">
      {/* Usage top bar — title + bell, not greeting */}
      <TopBar variant="usage" showBell={false} />

      {/* Segmented pill tabs */}
      <div style={{
        margin: '8px 16px 0',
        background: '#EDE9E3',
        borderRadius: 8,
        padding: 3,
        display: 'flex',
      }}>
        {['consumption', 'payments'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              flex: 1,
              padding: '10px 0',
              textAlign: 'center',
              fontSize: 14,
              fontWeight: activeTab === tab ? 600 : 500,
              color: activeTab === tab ? '#1A1814' : '#A09890',
              background: activeTab === tab ? '#FFFFFF' : 'transparent',
              borderRadius: activeTab === tab ? 6 : 0,
              boxShadow: activeTab === tab ? 'rgba(0,0,0,0.06) 0px 1px 2px' : 'none',
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'Inter, sans-serif',
              textTransform: 'capitalize',
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'consumption' ? (
        <>
          {/* Filter pills */}
          <div style={{
            display: 'flex',
            gap: 8,
            padding: '12px 16px 0',
            overflowX: 'auto',
          }}>
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                style={{
                  height: 32,
                  padding: '0 14px',
                  borderRadius: 100,
                  fontSize: 13,
                  fontWeight: 500,
                  border: activeFilter === f ? 'none' : '1px solid #E2DED7',
                  background: activeFilter === f ? '#5258ED' : '#FFFFFF',
                  color: activeFilter === f ? '#fff' : '#6B6860',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Chart card — chart + divider + stats + comparison (all inside) */}
          <div style={{
            margin: '12px 16px 0',
            background: '#FFFFFF',
            border: '1px solid #E2DED7',
            borderRadius: 16,
            padding: 20,
            boxShadow: 'none',
          }}>
            <BarChartComponent data={currentData} />

            {/* Divider */}
            <div style={{ height: 1, background: '#E2DED7', margin: '16px 0' }} />

            {/* Stats row */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
            }}>
              <div>
                <div style={{ fontSize: 12, fontWeight: 400, color: '#A09890' }}>
                  {filterMap[activeFilter].label}
                </div>
                <div style={{ fontSize: 16, fontWeight: 600, color: '#1A1814', marginTop: 2 }}>
                  {totalKwh} kWh
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 12, fontWeight: 400, color: '#A09890' }}>
                  Daily average
                </div>
                <div style={{ fontSize: 16, fontWeight: 600, color: '#1A1814', marginTop: 2 }}>
                  {avgKwh} kWh
                </div>
              </div>
            </div>

            {/* Comparison line — INSIDE the card */}
            <div style={{
              fontSize: 12,
              fontWeight: 500,
              color: '#B50027',
              marginTop: 12,
            }}>
              ↑ 18% more than last week
            </div>
          </div>

          {/* Circuit breakdown */}
          <div style={{ padding: '16px 16px 0' }}>
            <CircuitBreakdown circuits={circuits} />
          </div>

          {/* Live card */}
          <div style={{
            margin: '12px 16px 0',
            background: '#FFFFFF',
            border: '1px solid #E2DED7',
            borderRadius: 16,
            padding: '16px 20px',
            boxShadow: 'none',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <div>
              <div style={{ fontSize: 12, fontWeight: 500, color: '#6B6860' }}>Right now</div>
              <div style={{ fontSize: 20, fontWeight: 600, color: '#1A1814', marginTop: 4 }}>
                {powerStatus.currentDrawKw} kW
              </div>
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 4,
            }}>
              <span style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: '#5258ED',
              }} />
              <span style={{ fontSize: 12, fontWeight: 500, color: '#5258ED' }}>Live</span>
            </div>
          </div>

          {/* Below live card — standalone text */}
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 20px 0' }}>
            <span style={{ fontSize: 12, fontWeight: 400, color: '#A09890' }}>
              Amps: {powerStatus.currentDrawAmps}A · Voltage: {powerStatus.voltage}V
            </span>
            <span style={{ fontSize: 12, fontWeight: 400, color: '#6B6860' }}>
              Peak time today: 7–9 PM
            </span>
          </div>
        </>
      ) : (
        /* Payments tab */
        <div style={{ padding: '8px 0' }}>
          {payments.map((p, i) => (
            <div
              key={i}
              style={{
                margin: '8px 16px',
                background: '#FFFFFF',
                border: '1px solid #E2DED7',
                borderRadius: 16,
                padding: 16,
                boxShadow: 'none',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div>
                <div style={{ fontSize: 13, fontWeight: 400, color: '#6B6860' }}>
                  {p.date}
                </div>
                <div style={{ fontSize: 16, fontWeight: 600, color: '#1A1814', marginTop: 4 }}>
                  ₦{p.amount.toLocaleString()}
                </div>
              </div>
              <div style={{ fontSize: 13, fontWeight: 400, color: '#6B6860', textAlign: 'right' }}>
                {p.kwh} kWh
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
