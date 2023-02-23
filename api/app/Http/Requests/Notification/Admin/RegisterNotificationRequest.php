<?php

namespace App\Http\Requests\Notification\Admin;

use Illuminate\Foundation\Http\FormRequest;

class RegisterNotificationRequest extends FormRequest {
    public function authorize(): bool {
        return true;
    }

    public function rules(): array {
        return [
            'title'    => ['required', 'string', 'max:255'],
            'contents' => ['required', 'string', 'max:20000'],
        ];
    }
}
