<?php

namespace App\Http\Requests\Member\Admin;

use Illuminate\Foundation\Http\FormRequest;
use MakeIT\Member\Domain\Bean\Admin\LatestMemberBean;

class EditMemberRequest extends FormRequest
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
            'discord'     => ['max:255'],
            'twitter'     => ['max:255'],
            'github'      => ['max:255'],
            'description' => ['required', 'string', 'max:255'],
            'isActive'    => ['required', 'boolean'],
            'version'     => ['required', 'integer']
        ];
    }

    public function toDomain(): LatestMemberBean
    {
        $validatedRequest = $this->validated();

        return LatestMemberBean::from(
            $validatedRequest['name'],
            $validatedRequest['jobTitle'],
            $validatedRequest['discord'],
            $validatedRequest['twitter'],
            $validatedRequest['github'],
            $validatedRequest['description'],
            $validatedRequest['isActive'],
            $validatedRequest['version'],
        );
    }
}
