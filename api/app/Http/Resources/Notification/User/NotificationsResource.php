<?php

namespace App\Http\Resources\Notification\User;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class NotificationsResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        unset($request);

        return [
            'notificationId' => $this->notification_id,
            'title'          => $this->title,
            'contents'       => $this->contents,
            'createdAt'      => (new Carbon($this->created_at))->toISOString(),
        ];
    }
}
