import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Home from './pages/Home';
import TopUp from './pages/TopUp';
import Usage from './pages/Usage';
import Account from './pages/Account';
import BottomNav from './components/BottomNav';
import { PowerProvider } from './PowerContext';

function StatusBar() {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '22px 24px 0',
      fontSize: 15,
      fontWeight: 600,
      color: '#1A1814',
      fontFamily: 'Inter, sans-serif',
      position: 'sticky',
      top: 0,
      background: 'transparent',
      zIndex: 50,
      letterSpacing: '0.02em',
    }}>
      <span>9:41</span>
      <div style={{ display: 'flex', gap: 7, alignItems: 'center' }}>
        {/* Signal bars */}
        <svg width="18" height="12" viewBox="0 0 18 12" fill="none">
          <rect x="0" y="8" width="3.5" height="4" rx="1" fill="#1A1814"/>
          <rect x="5" y="5" width="3.5" height="7" rx="1" fill="#1A1814"/>
          <rect x="10" y="2" width="3.5" height="10" rx="1" fill="#1A1814"/>
          <rect x="15" y="0" width="3.5" height="12" rx="1" fill="#1A1814"/>
        </svg>
        {/* WiFi */}
        <svg width="17" height="12" viewBox="0 0 16 12" fill="#1A1814">
          <path d="M8 10a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"/>
          <path d="M4.5 7C5.6 5.8 6.7 5.2 8 5.2s2.4.6 3.5 1.8" stroke="#1A1814" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
          <path d="M1.5 4.5C3.3 2.5 5.5 1.5 8 1.5s4.7 1 6.5 3" stroke="#1A1814" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        </svg>
        {/* Battery */}
        <svg width="27" height="13" viewBox="0 0 27 13" fill="none">
          <rect x="0.5" y="0.5" width="23" height="12" rx="3.5" stroke="#1A1814" strokeOpacity="0.35"/>
          <rect x="2" y="2" width="19" height="9" rx="2" fill="#1A1814"/>
          <path d="M25 4.5v4a2.2 2.2 0 000-4z" fill="#1A1814" fillOpacity="0.4"/>
        </svg>
      </div>
    </div>
  );
}

export default function App() {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 480);

  useEffect(() => {
    const onResize = () => setIsDesktop(window.innerWidth > 480);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <BrowserRouter>
      <PowerProvider>
        <AppShell isDesktop={isDesktop} />
      </PowerProvider>
    </BrowserRouter>
  );
}

function AppShell({ isDesktop }) {
  const location = useLocation();
  return (
    <>
      {isDesktop && <StatusBar />}
      <div className="page-scroll">
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/topup" element={<TopUp />} />
          <Route path="/usage" element={<Usage />} />
          <Route path="/account" element={<Account />} />
        </Routes>
      </div>
      <BottomNav />
    </>
  );
}
