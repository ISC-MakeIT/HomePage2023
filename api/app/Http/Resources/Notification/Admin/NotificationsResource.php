<?php

namespace App\Http\Resources\Notification\Admin;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class NotificationsResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        unset($request);

        if ($this->activeNotification) {
            return [
                'notificationId' => $this->notification_id,
                'title'          => $this->activeNotification->title,
                'contents'       => $this->activeNotification->contents,
                'createdAt'      => (new Carbon($this->created_at))->toISOString(),
                'updatedAt'      => (new Carbon($this->activeNotification->created_at))->toISOString(),
                'isActive'       => true,
                'currentVersion' => $this->version,
            ];
        }

        return [
            'notificationId' => $this->notification_id,
            'title'          => $this->nonActiveNotification->title,
            'contents'       => $this->nonActiveNotification->contents,
            'createdAt'      => (new Carbon($this->created_at))->toISOString(),
            'updatedAt'      => (new Carbon($this->nonActiveNotification->created_at))->toISOString(),
            'isActive'       => false,
            'currentVersion' => $this->version,
        ];
    }
}
