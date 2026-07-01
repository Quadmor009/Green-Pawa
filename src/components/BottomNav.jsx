import { useLocation, useNavigate } from 'react-router-dom';

const tabs = [
  {
    label: 'Home',
    path: '/home',
    // Estate Lisitng.svg (outline) / Estate Lisitng-1.svg (filled)
    icon: (active) => active ? (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path opacity="0.4" d="M20.0402 6.81774L14.2802 2.78774C12.7102 1.68774 10.3002 1.74774 8.79023 2.91774L3.78023 6.82774C2.78023 7.60774 1.99023 9.20774 1.99023 10.4677V17.3677C1.99023 19.9177 4.06023 21.9977 6.61023 21.9977H17.3902C19.9402 21.9977 22.0102 19.9277 22.0102 17.3777V10.5977C22.0102 9.24774 21.1402 7.58774 20.0402 6.81774Z" fill="var(--indigo)"/>
        <path d="M12 18.75C11.59 18.75 11.25 18.41 11.25 18V15C11.25 14.59 11.59 14.25 12 14.25C12.41 14.25 12.75 14.59 12.75 15V18C12.75 18.41 12.41 18.75 12 18.75Z" fill="var(--indigo)"/>
      </svg>
    ) : (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M9.02 2.83821L3.63 7.03821C2.73 7.73821 2 9.22821 2 10.3582V17.7682C2 20.0882 3.89 21.9882 6.21 21.9882H17.79C20.11 21.9882 22 20.0882 22 17.7782V10.4982C22 9.28821 21.19 7.73821 20.2 7.04821L14.02 2.71821C12.62 1.73821 10.37 1.78821 9.02 2.83821Z" stroke="var(--text-muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 17.9922V14.9922" stroke="var(--text-muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    label: 'Usage',
    path: '/usage',
    // Estate Lisitng-2.svg (outline) / Estate Lisitng-3.svg (filled)
    icon: (active) => active ? (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path opacity="0.4" d="M16.1898 2H7.81976C4.17976 2 2.00977 4.17 2.00977 7.81V16.18C2.00977 19.82 4.17976 21.99 7.81976 21.99H16.1898C19.8298 21.99 21.9998 19.82 21.9998 16.18V7.81C21.9998 4.17 19.8298 2 16.1898 2Z" fill="var(--indigo)"/>
        <path d="M10.1103 11.1484H7.4603C6.8303 11.1484 6.32031 11.6584 6.32031 12.2884V17.4084H10.1103V11.1484V11.1484Z" fill="var(--indigo)"/>
        <path opacity="0.4" d="M12.7606 6.60156H11.2406C10.6106 6.60156 10.1006 7.11158 10.1006 7.74158V17.4016H13.8906V7.74158C13.8906 7.11158 13.3906 6.60156 12.7606 6.60156Z" fill="var(--indigo)"/>
        <path d="M16.5504 12.8516H13.9004V17.4016H17.6904V13.9916C17.6804 13.3616 17.1704 12.8516 16.5504 12.8516Z" fill="var(--indigo)"/>
      </svg>
    ) : (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M10.1103 11.1484H7.4603C6.8303 11.1484 6.32031 11.6584 6.32031 12.2884V17.4084H10.1103V11.1484V11.1484Z" stroke="var(--text-muted)" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12.7616 6.60156H11.2415C10.6115 6.60156 10.1016 7.11158 10.1016 7.74158V17.4016H13.8916V7.74158C13.8916 7.11158 13.3916 6.60156 12.7616 6.60156Z" stroke="var(--text-muted)" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16.5484 12.8516H13.8984V17.4016H17.6884V13.9916C17.6784 13.3616 17.1684 12.8516 16.5484 12.8516Z" stroke="var(--text-muted)" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z" stroke="var(--text-muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    label: 'Top Up',
    path: '/topup',
    // Estate Lisitng-4.svg (outline) / Estate Lisitng-5.svg (filled)
    icon: (active) => active ? (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path opacity="0.4" d="M19.48 12.95H21.5V11.51C21.5 9.44001 19.81 7.75 17.74 7.75H6.25999C4.18999 7.75 2.5 9.44001 2.5 11.51V15.16C3.29 14.44 4.35 14 5.5 14C7.99 14 10 16.02 10 18.5C10 19.03 9.91001 19.53 9.74001 20C9.47001 20.79 8.97 21.47 8.34 22H17.74C19.81 22 21.5 20.31 21.5 18.24V17.05H19.6C18.52 17.05 17.53 16.26 17.44 15.18C17.38 14.55 17.62 13.96 18.04 13.55C18.41 13.17 18.92 12.95 19.48 12.95Z" fill="var(--indigo)"/>
        <path d="M5.5 14C4.35 14 3.29 14.44 2.5 15.16C2.32 15.32 2.15 15.49 2 15.68C1.37 16.45 1 17.43 1 18.5C1 20.99 3.02 23 5.5 23C6.58 23 7.56 22.62 8.34 22C8.97 21.47 9.47001 20.79 9.74001 20C9.91001 19.53 10 19.03 10 18.5C10 16.02 7.99 14 5.5 14ZM8.2 17.63C8.2 17.94 7.94999 18.18 7.64999 18.18C7.34999 18.18 7.10001 17.94 7.10001 17.63V17.52C7.10001 17.4 7.01 17.3 6.89 17.3H4.63C4.74 17.51 4.71999 17.77 4.53999 17.95C4.43999 18.05 4.29999 18.11 4.14999 18.11C4.00999 18.11 3.87 18.05 3.77 17.95L2.96001 17.14C2.91001 17.09 2.87 17.03 2.84 16.96C2.79 16.83 2.79 16.68 2.84 16.54C2.87 16.48 2.91001 16.41 2.96001 16.36L3.77 15.56C3.98 15.34 4.32999 15.34 4.53999 15.56C4.71999 15.73 4.74 16 4.63 16.2H6.89C7.61 16.2 8.2 16.79 8.2 17.52V17.63ZM6.85001 21.6C6.70001 21.6 6.56001 21.55 6.46001 21.44C6.28001 21.27 6.26 21 6.37 20.8H4.11C3.39 20.8 2.8 20.21 2.8 19.48V19.37C2.8 19.06 3.05001 18.82 3.35001 18.82C3.65001 18.82 3.89999 19.06 3.89999 19.37V19.48C3.89999 19.6 3.99 19.7 4.11 19.7H6.37C6.26 19.49 6.28001 19.23 6.46001 19.05C6.67001 18.84 7.02 18.84 7.23 19.05L8.03999 19.86C8.08999 19.91 8.13 19.97 8.16 20.04C8.21 20.17 8.21 20.32 8.16 20.46C8.13 20.52 8.08999 20.59 8.03999 20.64L7.23 21.44C7.13 21.55 6.99001 21.6 6.85001 21.6Z" fill="var(--indigo)"/>
        <path d="M14.85 3.94768V7.74767H6.25999C4.18999 7.74767 2.5 9.43768 2.5 11.5077V7.8377C2.5 6.6477 3.23 5.58765 4.34 5.16765L12.28 2.16765C13.52 1.70765 14.85 2.61768 14.85 3.94768Z" fill="var(--indigo)"/>
        <path d="M22.5598 13.9731V16.0331C22.5598 16.5831 22.1198 17.0331 21.5598 17.0531H19.5998C18.5198 17.0531 17.5298 16.2631 17.4398 15.1831C17.3798 14.5531 17.6198 13.9631 18.0398 13.5531C18.4098 13.1731 18.9198 12.9531 19.4798 12.9531H21.5598C22.1198 12.9731 22.5598 13.4231 22.5598 13.9731Z" fill="var(--indigo)"/>
        <path d="M14 12.75H7C6.59 12.75 6.25 12.41 6.25 12C6.25 11.59 6.59 11.25 7 11.25H14C14.41 11.25 14.75 11.59 14.75 12C14.75 12.41 14.41 12.75 14 12.75Z" fill="var(--indigo)"/>
      </svg>
    ) : (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M2.5 13.24V11.51C2.5 9.44001 4.18999 7.75 6.25999 7.75H17.74C19.81 7.75 21.5 9.44001 21.5 11.51V12.95H19.48C18.92 12.95 18.41 13.17 18.04 13.55C17.62 13.96 17.38 14.55 17.44 15.18C17.53 16.26 18.52 17.05 19.6 17.05H21.5V18.24C21.5 20.31 19.81 22 17.74 22H12.26" stroke="var(--text-muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2.5 12.4113V7.84132C2.5 6.65132 3.23 5.59128 4.34 5.17128L12.28 2.17128C13.52 1.70128 14.85 2.62131 14.85 3.95131V7.7513" stroke="var(--text-muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M22.5588 13.9731V16.0331C22.5588 16.5831 22.1188 17.0331 21.5588 17.0531H19.5988C18.5188 17.0531 17.5288 16.2631 17.4388 15.1831C17.3788 14.5531 17.6188 13.9631 18.0388 13.5531C18.4088 13.1731 18.9188 12.9531 19.4788 12.9531H21.5588C22.1188 12.9731 22.5588 13.4231 22.5588 13.9731Z" stroke="var(--text-muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M7 12H14" stroke="var(--text-muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M3 16.5H8.34C8.98 16.5 9.5 17.02 9.5 17.66V18.94" stroke="var(--text-muted)" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M4.22 15.2812L3 16.5012L4.22 17.7212" stroke="var(--text-muted)" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9.5 21.7838H4.16C3.52 21.7838 3 21.2637 3 20.6237V19.3438" stroke="var(--text-muted)" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8.28125 23.0025L9.50125 21.7825L8.28125 20.5625" stroke="var(--text-muted)" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    label: 'Account',
    path: '/account',
    // Estate Lisitng-6.svg (outline) / Estate Lisitng-7.svg (filled)
    icon: (active) => active ? (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path opacity="0.4" d="M12 2C9.38 2 7.25 4.13 7.25 6.75C7.25 9.32 9.26 11.4 11.88 11.49C11.96 11.48 12.04 11.48 12.1 11.49C12.12 11.49 12.13 11.49 12.15 11.49C12.16 11.49 12.16 11.49 12.17 11.49C14.73 11.4 16.74 9.32 16.75 6.75C16.75 4.13 14.62 2 12 2Z" fill="var(--indigo)"/>
        <path d="M17.08 14.1528C14.29 12.2928 9.73996 12.2928 6.92996 14.1528C5.65996 15.0028 4.95996 16.1528 4.95996 17.3828C4.95996 18.6128 5.65996 19.7528 6.91996 20.5928C8.31996 21.5328 10.16 22.0028 12 22.0028C13.84 22.0028 15.68 21.5328 17.08 20.5928C18.34 19.7428 19.04 18.6028 19.04 17.3628C19.03 16.1328 18.34 14.9928 17.08 14.1528Z" fill="var(--indigo)"/>
      </svg>
    ) : (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M12.1596 10.87C12.0596 10.86 11.9396 10.86 11.8296 10.87C9.44957 10.79 7.55957 8.84 7.55957 6.44C7.55957 3.99 9.53957 2 11.9996 2C14.4496 2 16.4396 3.99 16.4396 6.44C16.4296 8.84 14.5396 10.79 12.1596 10.87Z" stroke="var(--text-muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M7.15973 14.56C4.73973 16.18 4.73973 18.82 7.15973 20.43C9.90973 22.27 14.4197 22.27 17.1697 20.43C19.5897 18.81 19.5897 16.17 17.1697 14.56C14.4297 12.73 9.91973 12.73 7.15973 14.56Z" stroke="var(--text-muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
];

export default function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="bottom-nav" style={{
      background: '#FFFFFF',
      borderTop: '1px solid #E2DED7',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around',
      padding: '12px 0 20px 0',
    }}>
      {tabs.map((tab) => {
        const isActive = location.pathname === tab.path;

        return (
          <button
            key={tab.path}
            onClick={() => navigate(tab.path)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 4,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              minWidth: 64,
              minHeight: 44,
              outline: 'none',
            }}
            aria-label={tab.label}
          >
            {tab.icon(isActive)}
            <span style={{
              fontSize: 11,
              fontWeight: isActive ? 700 : 500,
              letterSpacing: '0.02em',
              color: isActive ? '#5258ED' : '#A09890',
            }}>
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
