<?php

namespace App\Http\Requests\Member\Admin;

use Illuminate\Foundation\Http\FormRequest;

class DeleteMemberRequest extends FormRequest {
    public function authorize(): bool {
        return true;
    }

    public function rules(): array {
        return [
            'memberId' => ['required', 'integer', 'exists:members,member_id']
        ];
    }
}
