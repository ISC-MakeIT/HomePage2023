<?php

namespace App\Http\Resources\Notification\Admin;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class NotificationsResource extends JsonResource {
    public function toArray(Request $request): array {
        unset($request);

        if ($this->activeNotification) {
            return [
                'notificationId' => $this->notification_id,
                'title'          => $this->activeNotification->title,
                'contents'       => $this->activeNotification->contents,
                'createdAt'      => $this->creator,
                'updatedAt'      => $this->activeNotification->creator,
            ];
        }

        return [
            'notificationId' => $this->notification_id,
            'title'          => $this->nonActiveNotification->title,
            'contents'       => $this->nonActiveNotification->contents,
            'createdAt'      => $this->creator,
            'updatedAt'      => $this->nonActiveNotification->creator,
        ];
    }
}
