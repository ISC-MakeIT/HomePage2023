<?php

namespace App\Http\Requests\Work\Admin;

use Illuminate\Foundation\Http\FormRequest;

class RegisterWorkRequest extends FormRequest {
    public function authorize(): bool {
        return true;
    }

    public function rules(): array {
        return [
            'title'    => ['required', 'max:255'],
            'contents' => ['required', 'max:20000'],
        ];
    }
}
