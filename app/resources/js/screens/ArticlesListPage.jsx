import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const PER_PAGE_OPTIONS = [5, 10, 20];

export const ArticlesListPage = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(PER_PAGE_OPTIONS[1]);
    const [meta, setMeta] = useState({
        current_page: 1,
        last_page: 1,
        total: 0,
    });

    useEffect(() => {
        const load = async () => {
            setLoading(true);
            try {
                const res = await axios.get('/api/articles', {
                    params: { page, per_page: perPage },
                });
                const list = res.data?.data ?? [];
                setArticles(list);

                const metaData = res.data?.meta ?? {};
                setMeta({
                    current_page: metaData.current_page ?? page,
                    last_page: metaData.last_page ?? 1,
                    total: metaData.total ?? list.length,
                });
            } catch (e) {
                console.error('Failed to fetch articles', e);
                setError('Не удалось загрузить статьи');
            } finally {
                setLoading(false);
            }
        };

        load();
    }, [page, perPage]);

    const handlePerPageChange = (event) => {
        const nextPerPage = Number(event.target.value);
        setPerPage(nextPerPage);
        setPage(1);
    };

    if (loading) return <div className="text-gray-500">Загрузка...</div>;
    if (error) return <div className="text-red-600">{error}</div>;

    return (
        <div className="grid gap-4">
            <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Всего статей: {meta.total}</span>
                <label className="text-sm text-gray-700 flex items-center gap-2">
                    На странице:
                    <select
                        className="border border-gray-300 rounded px-2 py-1"
                        value={perPage}
                        onChange={handlePerPageChange}
                    >
                        {PER_PAGE_OPTIONS.map(option => (
                            <option key={option} value={option}>{option}</option>
                        ))}
                    </select>
                </label>
            </div>

            <div>
                {articles.length === 0 && (
                    <div className="text-gray-500">Пока нет статей.</div>
                )}

                {articles.map(articleItem => (
                    <article key={articleItem.id} className="py-3 border-b border-gray-200 grid gap-1">
                        <div className="flex items-center justify-between">
                            <h2 className="m-0 text-xl font-semibold">
                                <Link className="link" to={`/articles/${articleItem.id}`}>{articleItem.title}</Link>
                            </h2>
                            <Link className="text-sm link" to={`/articles/${articleItem.id}`}>Открыть →</Link>
                        </div>
                        <small className="text-gray-500">{articleItem.created_at}</small>
                        <p className="mt-0">{articleItem.content.length > 140 ? articleItem.content.slice(0, 140) + '…' : articleItem.content}</p>
                    </article>
                ))}
            </div>

            <div className="flex items-center justify-between">
                <button
                    type="button"
                    className="px-3 py-1 border border-gray-300 rounded disabled:opacity-50"
                    disabled={page <= 1}
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                >
                    ← Назад
                </button>
                <span className="text-sm text-gray-700">
                    Страница {meta.current_page} из {meta.last_page}
                </span>
                <button
                    type="button"
                    className="px-3 py-1 border border-gray-300 rounded disabled:opacity-50"
                    disabled={page >= meta.last_page}
                    onClick={() => setPage((prev) => Math.min(prev + 1, meta.last_page))}
                >
                    Вперёд →
                </button>
            </div>
        </div>
    );
};


