<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ArticleStoreRequest extends FormRequest
{
    protected function prepareForValidation(): void
    {
        $this->merge([
            'title' => $this->input('title', $this->input('name')),
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
            'title' => ['required', 'string', 'max:255'],
            'content' => ['required', 'string'],
        ];
    }
}


