<?php

namespace App\Http\Requests\Work\Admin;

use Illuminate\Foundation\Http\FormRequest;

class DeleteWorkRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'workId' => ['required', 'integer', 'exists:works,work_id'],
        ];
    }
}
