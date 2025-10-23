<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\CommentStoreRequest;
use App\Http\Resources\CommentResource;
use App\Models\Article;
use Illuminate\Http\Response;

class CommentController extends Controller
{
    public function store(CommentStoreRequest $request, int $articleId)
    {
        $article = Article::findOrFail($articleId);

        $comment = $article->comments()->create($request->validated());
        return (new CommentResource($comment))
            ->response()
            ->setStatusCode(Response::HTTP_CREATED);
    }
}
