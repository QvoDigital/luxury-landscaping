import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import ReviewsPage from './pages/ReviewsPage';
import './styles/global.css';
import './styles/layout.css';
import './styles/sections.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ReviewsPage />
  </StrictMode>
);
