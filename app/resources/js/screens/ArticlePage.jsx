import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

export const ArticlePage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [commentAuthor, setCommentAuthor] = useState('');
    const [commentContent, setCommentContent] = useState('');
    const [sending, setSending] = useState(false);
    const [removing, setRemoving] = useState(false);

    useEffect(() => {
        const load = async () => {
            try {
                const res = await axios.get(`/api/articles/${id}`);
                setArticle(res.data?.data);
            } catch (e) {
                setError('Не удалось загрузить статью');
            } finally {
                setLoading(false);
            }
        };
        load();
    }, [id]);

    const submitComment = async (e) => {
        e.preventDefault();
        if (!commentAuthor.trim() || !commentContent.trim()) return;
        setSending(true);
        try {
            const res = await axios.post(`/api/articles/${id}/comments`, {
                author_name: commentAuthor,
                content: commentContent,
            });
            const created = res.data?.data;
            setArticle(prev => ({ ...prev, comments: [...(prev?.comments || []), created] }));
            setCommentAuthor('');
            setCommentContent('');
        } catch (e) {
            alert('Не удалось отправить комментарий');
        } finally {
            setSending(false);
        }
    };

    const removeArticle = async () => {
        if (!window.confirm('Удалить статью? Отменить действие будет невозможно.')) return;
        setRemoving(true);
        try {
            await axios.delete(`/api/articles/${id}`);
            navigate('/');
        } catch (e) {
            alert('Не удалось удалить статью');
        } finally {
            setRemoving(false);
        }
    };

    if (loading) return <div className="text-gray-500">Загрузка...</div>;
    if (error) return <div className="text-red-600">{error}</div>;
    if (!article) return null;

    return (
        <div>
            <div className="flex items-center justify-between gap-3">
                <div>
                    <h2 className="mb-1 text-2xl font-semibold">{article.title}</h2>
                    <small className="text-gray-500">{article.created_at}</small>
                </div>
                <div className="flex gap-2">
                    <button onClick={() => navigate('/')} className="px-3 py-1.5 border border-gray-300 rounded-md">К списку</button>
                    <button onClick={removeArticle} disabled={removing} className="px-3 py-1.5 border rounded-md border-red-600 text-red-600 disabled:opacity-60">
                        {removing ? 'Удаление…' : 'Удалить'}
                    </button>
                </div>
            </div>
            <p className="mt-3 whitespace-pre-line">{article.content}</p>

            <section style={{ marginTop: 24 }}>
                <h3>Комментарии</h3>
                {(article.comments || []).length === 0 ? (
                    <p>Пока нет комментариев</p>
                ) : (
                    <ul style={{ paddingLeft: 16 }}>
                        {article.comments.map(comment => (
                            <li key={comment.id} style={{ margin: '12px 0', borderBottom: '1px solid #eee', paddingBottom: 8 }}>
                                <strong>{comment.author_name}</strong>
                                <div style={{ marginTop: 4 }}>{comment.content}</div>
                            </li>
                        ))}
                    </ul>
                )}
            </section>

            <form onSubmit={submitComment} className="mt-6 grid gap-3">
                <input
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    type="text"
                    placeholder="Ваше имя"
                    value={commentAuthor}
                    onChange={(e) => setCommentAuthor(e.target.value)}
                />
                <textarea
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    rows={4}
                    placeholder="Ваш комментарий"
                    value={commentContent}
                    onChange={(e) => setCommentContent(e.target.value)}
                />
                <button type="submit" disabled={sending} className="px-3 py-1.5 border border-indigo-600 text-indigo-600 rounded-md disabled:opacity-60">
                    {sending ? 'Отправка...' : 'Добавить комментарий'}
                </button>
            </form>
        </div>
    );
};


