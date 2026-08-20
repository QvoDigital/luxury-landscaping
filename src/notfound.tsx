import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import NotFoundPage from './pages/NotFoundPage';
import './styles/global.css';
import './styles/layout.css';
import './styles/sections.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <NotFoundPage />
  </StrictMode>
);
