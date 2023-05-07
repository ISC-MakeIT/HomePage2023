<?php

namespace App\Http\Requests\Member\Admin;

use Illuminate\Foundation\Http\FormRequest;
use MakeIT\Member\Domain\Bean\ChangeRoleBean;

class ChangeRoleRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'memberId' => ['required', 'integer', 'exists:members,member_id'],
            'roleId'   => ['required', 'integer', 'exists:roles,role_id'],
            'version'  => ['required', 'integer'],
        ];
    }

    public function toDomain(): ChangeRoleBean
    {
        $validatedRequest = $this->validated();

        return ChangeRoleBean::from(
            $validatedRequest['memberId'],
            $validatedRequest['roleId'],
            $validatedRequest['version'],
        );
    }
}
