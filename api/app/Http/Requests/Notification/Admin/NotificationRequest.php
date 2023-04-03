<?php

namespace App\Http\Requests\Notification\Admin;

use Illuminate\Foundation\Http\FormRequest;

class NotificationRequest extends FormRequest {
    public function authorize(): bool {
        return true;
    }

    public function all($keys = null) {
        return array_merge(parent::all(), ['notificationId' => $this->route('notificationId')]);
    }

    public function rules(): array {
        return [
            'notificationId' => ['required', 'integer', 'exists:notifications,notification_id'],
        ];
    }
}
