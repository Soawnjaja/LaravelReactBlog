<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ArticleStoreRequest;
use App\Http\Resources\ArticleResource;
use App\Models\Article;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class ArticleController extends Controller
{
    public function index(Request $request)
    {
        $perPage = (int) $request->integer('per_page', 10);
        $perPage = $perPage > 0 ? min($perPage, 50) : 10;

        $articles = Article::query()
            ->latest()
            ->paginate($perPage, ['id', 'title', 'content', 'created_at'])
            ->appends($request->only('per_page'));

        return ArticleResource::collection($articles);
    }

    public function show(int $id)
    {
        $article = Article::with('comments')->findOrFail($id);
        return new ArticleResource($article);
    }

    public function store(ArticleStoreRequest $request)
    {
        $article = Article::create($request->validated());
        return (new ArticleResource($article))
            ->response()
            ->setStatusCode(Response::HTTP_CREATED);
    }

    public function update(ArticleStoreRequest $request, int $id)
    {
        $article = Article::findOrFail($id);
        $article->update($request->validated());
        return new ArticleResource($article->fresh());
    }

    public function destroy(int $id)
    {
        $article = Article::findOrFail($id);
        $article->delete();
        return response()->noContent();
    }
}

