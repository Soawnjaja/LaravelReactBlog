import './bootstrap';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './routes';

const mountEl = document.getElementById('app');
if (mountEl) {
    const root = createRoot(mountEl);
    root.render(
        <React.StrictMode>
            <BrowserRouter>
                <AppRouter />
            </BrowserRouter>
        </React.StrictMode>
    );
}


