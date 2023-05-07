<?php

namespace App\Http\Requests\Member\Admin;

use Illuminate\Foundation\Http\FormRequest;
use MakeIT\Member\Domain\Bean\InitMemberBean;

class RegisterMemberRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name'        => ['required', 'string', 'max:255'],
            'jobTitle'    => ['required', 'string', 'max:255'],
            'roleId'      => ['required', 'integer', 'max:255'],
            'discord'     => ['max:255'],
            'twitter'     => ['max:255'],
            'github'      => ['max:255'],
            'description' => ['required', 'string', 'max:255'],
            'icon'        => ['required', 'image', 'mimes:png,jpg,jpeg', 'max:4096'],
            'username'    => ['required', 'string', 'max:255'],
            'password'    => ['required', 'string', 'max:255'],
        ];
    }

    public function toDomain(): InitMemberBean
    {
        $validatedRequest = $this->validated();

        return InitMemberBean::from(
            $validatedRequest['name'],
            $validatedRequest['jobTitle'],
            $validatedRequest['roleId'],
            $validatedRequest['discord'],
            $validatedRequest['twitter'],
            $validatedRequest['github'],
            $validatedRequest['description'],
            $this->file('icon'),
            $validatedRequest['username'],
            $validatedRequest['password'],
        );
    }
}
