import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { auditServiceImages } from './data/serviceImages';
import { SERVICES_DATA } from './data/salonData';

// Run automated development-time image validation audit
auditServiceImages(SERVICES_DATA);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

