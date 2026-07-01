import { createContext, useContext, useState } from 'react';
import { powerStatus as defaultPowerStatus, payments as defaultPayments } from './data';

export const MAX_BALANCE_KWH = 200;

const PowerContext = createContext();

export function PowerProvider({ children }) {
  const [power, setPower] = useState({ ...defaultPowerStatus });
  const [payments, setPayments] = useState([...defaultPayments]);

  const topUp = (amount, kwh) => {
    // Cap at max balance
    const newRemaining = Math.min(MAX_BALANCE_KWH, Math.round((power.remainingKwh + kwh) * 10) / 10);
    const newPercentage = Math.round((newRemaining / MAX_BALANCE_KWH) * 100);
    const newHours = Math.round((newRemaining / power.currentDrawKw) * 10) / 10;

    setPower({
      ...power,
      state: 'active',
      remainingKwh: newRemaining,
      lastTopUpKwh: MAX_BALANCE_KWH,
      percentage: newPercentage,
      hoursRemaining: newHours,
    });

    const today = new Date();
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const dateStr = `${today.getDate()} ${months[today.getMonth()]}, ${today.getFullYear()}`;

    setPayments([
      { date: dateStr, amount, kwh },
      ...payments,
    ]);
  };

  return (
    <PowerContext.Provider value={{ power, payments, topUp }}>
      {children}
    </PowerContext.Provider>
  );
}

export function usePower() {
  return useContext(PowerContext);
}
