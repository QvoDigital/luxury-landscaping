import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import TeamPage from './pages/TeamPage';
import './styles/global.css';
import './styles/layout.css';
import './styles/sections.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TeamPage />
  </StrictMode>
);
