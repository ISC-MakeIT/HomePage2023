<?php

namespace App\Http\Requests\OGP\Admin;

use Illuminate\Foundation\Http\FormRequest;

class EditOGPRequest extends FormRequest {
    public function authorize(): bool {
        return true;
    }

    public function rules(): array {
        return [
            'url'         => ['required', 'string', 'max:512'],
            'title'       => ['required', 'string', 'max:255'],
            'description' => ['required', 'string', 'max:1000'],
            'keywords'    => ['required', 'string', 'max:1000'],
            'thumbnail'   => ['mimes:png,jpg,jpeg', 'max:4096'],
        ];
    }
}
