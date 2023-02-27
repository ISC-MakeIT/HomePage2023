<?php

namespace App\Http\Requests\Work\Admin;

use Illuminate\Foundation\Http\FormRequest;

class EditWorkRequest extends FormRequest {
    public function authorize(): bool {
        return true;
    }

    public function rules(): array {
        return [
            'workId'         => ['required', 'integer', 'exists:works,work_id'],
            'currentVersion' => ['required', 'integer'],
            'title'          => ['required', 'max:255'],
            'contents'       => ['required', 'max:20000'],
            'isActive'       => ['required', 'boolean'],
        ];
    }
}
