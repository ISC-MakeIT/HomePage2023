<?php

namespace App\Http\Requests\Member\Admin;

use Illuminate\Foundation\Http\FormRequest;
use MakeIT\Member\Domain\Bean\CredentialBean;

class MemberLoginRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'username' => ['required', 'string', 'max:255'],
            'password' => ['required', 'string', 'max:255'],
        ];
    }

    public function toBean(): CredentialBean
    {
        $validatedRequest = $this->validated();

        return CredentialBean::from($validatedRequest['username'], $validatedRequest['password']);
    }
}
