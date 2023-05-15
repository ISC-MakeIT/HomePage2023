<?php

namespace App\Http\Requests\Member\Admin;

use Illuminate\Foundation\Http\FormRequest;
use MakeIT\Member\Domain\Bean\Admin\LatestMemberIconBean;

class EditMemberIconRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'icon'    => ['required', 'image', 'mimes:png,jpg,jpeg', 'max:4096'],
            'version' => ['required', 'integer'],
        ];
    }

    public function toDomain(): LatestMemberIconBean
    {
        $validatedRequest = $this->validated();

        return LatestMemberIconBean::from($this->file('icon'), $validatedRequest['version']);
    }
}
