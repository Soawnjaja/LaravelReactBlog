import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const NewArticlePage = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [sending, setSending] = useState(false);
    const [error, setError] = useState('');

    const submit = async (e) => {
        e.preventDefault();
        setError('');
        if (!title.trim() || !content.trim()) {
            setError('Заполните заголовок и содержимое');
            return;
        }
        setSending(true);
        try {
            const res = await axios.post('/api/articles', { title, content });
            navigate(`/articles/${res.data.id}`);
        } catch (e) {
            setError('Не удалось создать статью');
        } finally {
            setSending(false);
        }
    };

    return (
        <form onSubmit={submit} style={{ display: 'grid', gap: 12 }}>
            <h2>Новая статья</h2>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <input
                type="text"
                placeholder="Заголовок"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
                rows={10}
                placeholder="Содержимое (без WYSIWYG — просто текст)"
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />
            <button type="submit" disabled={sending}>
                {sending ? 'Создание...' : 'Создать'}
            </button>
        </form>
    );
};


