<?php

namespace App\Http\Requests\OGP\Admin;

use Illuminate\Foundation\Http\FormRequest;

class DeleteOGPRequest extends FormRequest {
    public function authorize(): bool {
        return true;
    }

    public function rules(): array {
        return [
            'url' => ['required', 'string', 'url'],
        ];
    }
}
