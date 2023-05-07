<?php

namespace App\Http\Requests\Work\Admin;

use Illuminate\Foundation\Http\FormRequest;

class WorkRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function all($keys = null)
    {
        return array_merge(parent::all(), ['workId' => $this->route('workId')]);
    }

    public function rules(): array
    {
        return [
            'workId' => ['required', 'integer', 'exists:works,work_id'],
        ];
    }
}
