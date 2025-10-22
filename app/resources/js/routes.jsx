import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { ArticlesListPage } from './screens/ArticlesListPage';
import { ArticlePage } from './screens/ArticlePage';
import { NewArticlePage } from './screens/NewArticlePage';

export const AppRouter = () => (
    <div className="container" style={{ maxWidth: 900, margin: '0 auto', padding: 16 }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h1>Блог</h1>
            <nav style={{ display: 'flex', gap: 12 }}>
                <Link to="/">Статьи</Link>
                <Link to="/new">Новая статья</Link>
            </nav>
        </header>
        <main style={{ marginTop: 24 }}>
            <Routes>
                <Route path="/" element={<ArticlesListPage />} />
                <Route path="/articles/:id" element={<ArticlePage />} />
                <Route path="/new" element={<NewArticlePage />} />
            </Routes>
        </main>
    </div>
);


