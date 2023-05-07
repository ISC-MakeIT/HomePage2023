<?php

namespace App\Http\Requests\Contact\User;

use Illuminate\Foundation\Http\FormRequest;

class ContactRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'email'    => ['required', 'email'],
            'name'     => ['required', 'string', 'max:255'],
            'category' => ['required', 'string', 'max:255'],
        ];
    }
}
