<?php

namespace App\Http\Requests\Member\Admin;

use Illuminate\Foundation\Http\FormRequest;

class ChangeRoleRequest extends FormRequest {
    public function authorize(): bool {
        return true;
    }

    public function rules(): array {
        return [
            'memberId' => ['required', 'integer', 'exists:members,member_id'],
            'roleId'   => ['required', 'integer', 'exists:roles,role_id'],
        ];
    }
}
