<?php

namespace App\Http\Requests\Member\Admin;

use Illuminate\Foundation\Http\FormRequest;
use MakeIT\Member\Domain\Bean\Admin\ChangeActivityBean;

class ChangeActivityRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'memberId' => ['required', 'integer', 'exists:members,member_id'],
            'isActive' => ['required', 'boolean'],
            'version'  => ['required', 'integer'],
        ];
    }

    public function toDomain(): ChangeActivityBean
    {
        $validatedRequest = $this->validated();

        return ChangeActivityBean::from(
            $validatedRequest['memberId'],
            $validatedRequest['isActive'],
            $validatedRequest['version'],
        );
    }
}
