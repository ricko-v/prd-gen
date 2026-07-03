<?php

namespace App\Http\Requests\Project;

use Illuminate\Foundation\Http\FormRequest;

class StoreProjectRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string', 'max:2000'],
            'idea' => ['nullable', 'string', 'max:5000'],
            'ai_provider' => ['nullable', 'string', 'max:255'],
            'ai_model' => ['nullable', 'string', 'max:255'],
        ];
    }
}
