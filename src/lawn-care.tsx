import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { serviceAreas } from './content/services';
import ServiceAreaPage from './pages/ServiceAreaPage';
import './styles/global.css';
import './styles/layout.css';
import './styles/sections.css';

const area = serviceAreas.find((a) => a.id === 'lawn-care')!;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ServiceAreaPage area={area} />
  </StrictMode>
);
