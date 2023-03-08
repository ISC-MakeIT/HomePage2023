<?php

namespace App\Http\Requests\Member\Admin;

use Illuminate\Foundation\Http\FormRequest;

class MemberRequest extends FormRequest {
    public function authorize(): bool {
        return true;
    }

    public function all($keys = null) {
        return array_merge(parent::all($keys), ['memberId' => $this->route('memberId')]);
    }

    public function rules(): array {
        return [
            'memberId' => ['required', 'integer', 'exists:members,member_id']
        ];
    }
}
