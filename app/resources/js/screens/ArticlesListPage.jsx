import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export const ArticlesListPage = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const load = async () => {
            try {
                const res = await axios.get('/api/articles');
                const payload = Array.isArray(res.data)
                    ? res.data
                    : (Array.isArray(res.data?.data) ? res.data.data : []);
                setArticles(payload);
                if (!Array.isArray(res.data) && !Array.isArray(res.data?.data)) {
                    console.warn('Unexpected articles payload shape', res.data);
                }
            } catch (e) {
                setError('Не удалось загрузить статьи');
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    if (loading) return <div>Загрузка...</div>;
    if (error) return <div style={{ color: 'red' }}>{error}</div>;

    return (
        <div>
            {articles.map(a => (
                <article key={a.id} style={{ padding: '12px 0', borderBottom: '1px solid #eee' }}>
                    <h2 style={{ margin: '0 0 6px' }}>
                        <Link to={`/articles/${a.id}`}>{a.title}</Link>
                    </h2>
                    <small style={{ color: '#666' }}>{new Date(a.created_at).toLocaleDateString()}</small>
                    <p style={{ marginTop: 8 }}>{a.content.length > 140 ? a.content.slice(0, 140) + '…' : a.content}</p>
                </article>
            ))}
        </div>
    );
};


