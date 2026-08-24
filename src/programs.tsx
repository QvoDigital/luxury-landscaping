import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import ProgramsPage from './pages/ProgramsPage';
import './styles/global.css';
import './styles/layout.css';
import './styles/sections.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ProgramsPage />
  </StrictMode>
);
