<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CommentStoreRequest extends FormRequest
{
    protected function prepareForValidation(): void
    {
        $this->merge([
            'author_name' => $this->input('author_name', $this->input('author')),
            'content' => $this->input('content', $this->input('message')),
        ]);
    }

    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'author_name' => ['required', 'string', 'max:255'],
            'content' => ['required', 'string'],
        ];
    }
}


