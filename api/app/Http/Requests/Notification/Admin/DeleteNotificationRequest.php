<?php

namespace App\Http\Requests\Notification\Admin;

use Illuminate\Foundation\Http\FormRequest;

class DeleteNotificationRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'notificationId' => ['required', 'integer', 'exists:notifications,notification_id'],
        ];
    }
}
