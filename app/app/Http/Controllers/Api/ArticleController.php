<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ArticleStoreRequest;
use App\Http\Resources\ArticleResource;
use App\Models\Article;
use Illuminate\Http\Response;

class ArticleController extends Controller
{
    public function index()
    {
        $articles = Article::query()->latest()->get(['id', 'title', 'content', 'created_at']);
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
}

