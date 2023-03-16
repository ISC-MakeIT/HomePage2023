<?php

namespace App\Http\Requests\Member\Admin;

use Illuminate\Foundation\Http\FormRequest;

class RegisterMemberRequest extends FormRequest {
    public function authorize(): bool {
        return true;
    }

    public function rules(): array {
        return [
            'name'        => ['required', 'string', 'max:255'],
            'jobTitle'    => ['required', 'string', 'max:255'],
            'roleId'      => ['required', 'integer', 'max:255'],
            'discord'     => ['max:255'],
            'twitter'     => ['max:255'],
            'github'      => ['max:255'],
            'description' => ['required', 'string', 'max:255'],
            'username'    => ['required', 'string', 'max:255'],
            'password'    => ['required', 'string', 'max:255'],
            'picture'     => ['required', 'max:5096'],
        ];
    }
}
