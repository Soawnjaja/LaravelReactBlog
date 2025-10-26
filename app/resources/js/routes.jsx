import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { ArticlesListPage } from './screens/ArticlesListPage';
import { ArticlePage } from './screens/ArticlePage';
import { NewArticlePage } from './screens/NewArticlePage';

export const AppRouter = () => (
    <div className="container">
        <header className="flex items-center justify-between py-6 border-b border-gray-200">
            <h1 className="text-3xl font-bold">Блог</h1>
            <nav className="flex gap-4">
                <Link className="link" to="/">Статьи</Link>
                <Link className="link" to="/new">Новая статья</Link>
            </nav>
        </header>
        <main className="mt-6">
            <Routes>
                <Route path="/" element={<ArticlesListPage />} />
                <Route path="/articles/:id" element={<ArticlePage />} />
                <Route path="/new" element={<NewArticlePage />} />
            </Routes>
        </main>
    </div>
);


