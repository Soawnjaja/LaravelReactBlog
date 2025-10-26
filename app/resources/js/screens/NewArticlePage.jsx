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
            navigate(`/articles/${res.data?.data?.id}`);
        } catch (e) {
            setError('Не удалось создать статью');
        } finally {
            setSending(false);
        }
    };

    return (
        <form onSubmit={submit} className="grid gap-3">
            <h2 className="text-2xl font-semibold">Новая статья</h2>
            {error && <div className="text-red-600">{error}</div>}
            <input
                className="border border-gray-300 rounded-md px-3 py-2"
                type="text"
                placeholder="Заголовок"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
                className="border border-gray-300 rounded-md px-3 py-2"
                rows={10}
                placeholder="Содержимое (без WYSIWYG — просто текст)"
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />
            <div className="flex gap-2">
                <button type="submit" disabled={sending} className="px-3 py-1.5 border border-indigo-600 text-indigo-600 rounded-md disabled:opacity-60">
                    {sending ? 'Создание...' : 'Создать'}
                </button>
                <button type="button" onClick={() => navigate('/')} disabled={sending} className="px-3 py-1.5 border border-gray-300 rounded-md">
                    Отмена
                </button>
            </div>
        </form>
    );
};


