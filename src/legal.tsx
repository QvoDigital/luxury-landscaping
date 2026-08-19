import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { legalDocs } from './content/legal';
import LegalPage from './pages/LegalPage';
import './styles/global.css';
import './styles/layout.css';
import './styles/sections.css';

/**
 * Shared entry for the four legal documents. Each HTML file declares which one it is with
 * `<html data-legal="privacy">`, so the same bundle serves all four URLs.
 */
const id = document.documentElement.dataset.legal;
const doc = legalDocs.find((d) => d.id === id) ?? legalDocs[0];

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LegalPage doc={doc} />
  </StrictMode>
);
