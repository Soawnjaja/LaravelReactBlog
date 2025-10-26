<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ArticleResource extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'content' => $this->content,
            'created_at' => $this->created_at?->toISOString(),
            'created_at_human' => $this->created_at?->translatedFormat('d.m.Y'),
            'comments' => CommentResource::collection($this->whenLoaded('comments')),
        ];
    }
}


