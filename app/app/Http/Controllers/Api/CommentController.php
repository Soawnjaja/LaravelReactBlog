<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Article;
use App\Models\Comment;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class CommentController extends Controller
{
    public function store(Request $request, int $articleId)
    {
        $article = Article::findOrFail($articleId);

        $validated = $request->validate([
            'author_name' => ['required', 'string', 'max:255'],
            'content' => ['required', 'string'],
        ]);

        $comment = $article->comments()->create($validated);
        return response()->json($comment, Response::HTTP_CREATED);
    }
}

<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    //
}
