import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export const ArticlePage = () => {
    const { id } = useParams();
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [commentAuthor, setCommentAuthor] = useState('');
    const [commentContent, setCommentContent] = useState('');
    const [sending, setSending] = useState(false);

    useEffect(() => {
        const load = async () => {
            try {
                const res = await axios.get(`/api/articles/${id}`);
                setArticle(res.data);
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
            setArticle(prev => ({ ...prev, comments: [...(prev.comments || []), res.data] }));
            setCommentAuthor('');
            setCommentContent('');
        } catch (e) {
            alert('Не удалось отправить комментарий');
        } finally {
            setSending(false);
        }
    };

    if (loading) return <div>Загрузка...</div>;
    if (error) return <div style={{ color: 'red' }}>{error}</div>;
    if (!article) return null;

    return (
        <div>
            <h2>{article.title}</h2>
            <small style={{ color: '#666' }}>{new Date(article.created_at).toLocaleString()}</small>
            <p style={{ marginTop: 12, whiteSpace: 'pre-line' }}>{article.content}</p>

            <section style={{ marginTop: 24 }}>
                <h3>Комментарии</h3>
                {(article.comments || []).length === 0 ? (
                    <p>Пока нет комментариев</p>
                ) : (
                    <ul style={{ paddingLeft: 16 }}>
                        {article.comments.map(c => (
                            <li key={c.id} style={{ margin: '12px 0', borderBottom: '1px solid #eee', paddingBottom: 8 }}>
                                <strong>{c.author_name}</strong>
                                <div style={{ marginTop: 4 }}>{c.content}</div>
                            </li>
                        ))}
                    </ul>
                )}
            </section>

            <form onSubmit={submitComment} style={{ marginTop: 24, display: 'grid', gap: 12 }}>
                <input
                    type="text"
                    placeholder="Ваше имя"
                    value={commentAuthor}
                    onChange={(e) => setCommentAuthor(e.target.value)}
                />
                <textarea
                    rows={4}
                    placeholder="Ваш комментарий"
                    value={commentContent}
                    onChange={(e) => setCommentContent(e.target.value)}
                />
                <button type="submit" disabled={sending}>
                    {sending ? 'Отправка...' : 'Добавить комментарий'}
                </button>
            </form>
        </div>
    );
};


