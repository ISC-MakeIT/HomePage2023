<?php

namespace App\Http\Requests\Member\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Hash;
use MakeIT\Member\Domain\Bean\Admin\CredentialBean;

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

        return CredentialBean::from($validatedRequest['username'], Hash::make($validatedRequest['password']));
    }
}
