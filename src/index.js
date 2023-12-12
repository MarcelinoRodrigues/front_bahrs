import React from 'react';
import ReactDOM from 'react-dom/client';
import RoutesApp from './routes';
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RoutesApp />
  </React.StrictMode>
);