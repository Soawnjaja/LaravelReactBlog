<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Article;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class ArticleController extends Controller
{
    public function index()
    {
        $articles = Article::query()->latest()->get(['id', 'title', 'content', 'created_at']);
        return response()->json($articles);
    }

    public function show(int $id)
    {
        $article = Article::with('comments')->findOrFail($id);
        return response()->json($article);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'content' => ['required', 'string'],
        ]);

        $article = Article::create($validated);
        return response()->json($article, Response::HTTP_CREATED);
    }
}

