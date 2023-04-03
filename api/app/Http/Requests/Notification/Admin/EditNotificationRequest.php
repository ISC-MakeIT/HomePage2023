<?php

namespace App\Http\Requests\Notification\Admin;

use Illuminate\Foundation\Http\FormRequest;

class EditNotificationRequest extends FormRequest {
    public function authorize(): bool {
        return true;
    }

    public function rules(): array {
        return [
            'notificationId' => ['required', 'integer', 'exists:notifications,notification_id'],
            'currentVersion' => ['required', 'integer'],
            'title'          => ['required', 'max:255'],
            'contents'       => ['required', 'string', 'max:20000'],
            'isActive'       => ['required', 'boolean']
        ];
    }
}
