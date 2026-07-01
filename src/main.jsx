import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// On desktop, wrap #root in the iPhone frame shell
if (window.innerWidth > 480) {
  const root = document.getElementById('root');
  const frame = document.createElement('div');
  frame.className = 'iphone-frame';
  root.parentNode.insertBefore(frame, root);
  frame.appendChild(root);
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
