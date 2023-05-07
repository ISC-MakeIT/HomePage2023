<?php

namespace App\Http\Requests\Member\Admin;

use Illuminate\Foundation\Http\FormRequest;

class ChangePasswordRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'oldPassword' => ['required', 'max:255'],
            'newPassword' => ['required', 'max:255'],
        ];
    }
}
