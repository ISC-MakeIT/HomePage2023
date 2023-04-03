<?php

namespace App\Http\Requests\Member\Admin;

use Illuminate\Foundation\Http\FormRequest;

class EditMemberIconRequest extends FormRequest {
    public function authorize(): bool {
        return true;
    }

    public function rules(): array {
        return [
            'icon' => ['required', 'image', 'mimes:png,jpg,jpeg', 'max:4096'],
        ];
    }
}
