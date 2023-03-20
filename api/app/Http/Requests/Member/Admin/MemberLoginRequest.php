<?php

namespace App\Http\Requests\Member\Admin;

use Illuminate\Foundation\Http\FormRequest;

class MemberLoginRequest extends FormRequest {
    public function authorize(): bool {
        return true;
    }

    public function rules(): array {
        return [
            'username'    => ['required', 'string', 'max:255'],
            'password'    => ['required', 'string', 'max:255'],
        ];
    }
}
