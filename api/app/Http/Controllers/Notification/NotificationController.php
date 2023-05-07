<?php

namespace App\Http\Controllers\Notification;

use App\Http\Controllers\Controller;
use App\Http\Resources\Notification\User\NotificationsResource;
use App\Models\Notification\ActiveNotification;
use Illuminate\Http\JsonResponse;

class NotificationController extends Controller
{
    public function notifications(): JsonResponse
    {
        $activeNotification = ActiveNotification::orderBy('notification_id', 'DESC')->get();

        return NotificationsResource::collection($activeNotification)->response();
    }
}
