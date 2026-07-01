export const tenant = {
  name: 'Adebayo',
  firstName: 'Adebayo',
  apartment: 'Apt 4B · Block A',
  avatar: 'A',
};

export const powerStatus = {
  state: 'active', // 'active' | 'disconnected'
  remainingKwh: 3.2,
  lastTopUpKwh: 200,
  percentage: 2,
  hoursRemaining: 2.4,
  currentDrawKw: 1.2,
  currentDrawAmps: 5.2,
  voltage: 230,
};

export const usageData = {
  week: [
    { day: 'Mon', kwh: 38 },
    { day: 'Tue', kwh: 32 },
    { day: 'Wed', kwh: 35 },
    { day: 'Thu', kwh: 40 },
    { day: 'Fri', kwh: 44 },
    { day: 'Sat', kwh: 52 },
    { day: 'Sun', kwh: 48, active: true },
  ],
  month: [
    { day: 'W1', kwh: 260 },
    { day: 'W2', kwh: 298 },
    { day: 'W3', kwh: 271 },
    { day: 'W4', kwh: 289, active: true },
  ],
  threeMonth: [
    { day: 'Apr', kwh: 980 },
    { day: 'May', kwh: 1100 },
    { day: 'Jun', kwh: 1118, active: true },
  ],
  sixMonth: [
    { day: 'Jan', kwh: 820 },
    { day: 'Feb', kwh: 760 },
    { day: 'Mar', kwh: 900 },
    { day: 'Apr', kwh: 980 },
    { day: 'May', kwh: 1100 },
    { day: 'Jun', kwh: 1118, active: true },
  ],
};

export const circuits = [
  { name: 'Air Conditioning', kw: 0.7, pct: 58, color: '#858500' },
  { name: 'Lighting',         kw: 0.2, pct: 17, color: '#6EBF92' },
  { name: 'Kitchen',          kw: 0.2, pct: 17, color: '#C54134' },
  { name: 'Other',            kw: 0.1, pct: 8,  color: '#E2DED7' },
];

export const payments = [
  { date: '27 Jun, 2026', amount: 1000, kwh: 11.8 },
  { date: '18 Jun, 2026', amount: 2000, kwh: 23.5 },
  { date: '9 Jun, 2026',  amount: 1000, kwh: 11.8 },
  { date: '1 Jun, 2026',  amount: 500,  kwh: 5.9  },
];
