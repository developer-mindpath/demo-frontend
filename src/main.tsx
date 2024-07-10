import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { SnackbarProvider } from 'notistack';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SnackbarProvider
      maxSnack={2}
      autoHideDuration={2000}
      preventDuplicate
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
    >
      <App />
    </SnackbarProvider>
  </React.StrictMode>,
);
