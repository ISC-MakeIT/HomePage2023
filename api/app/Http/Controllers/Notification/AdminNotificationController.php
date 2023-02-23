<?php

namespace App\Http\Controllers\Notification;

use App\Http\Controllers\Controller;
use App\Http\Requests\Notification\Admin\RegisterNotificationRequest;
use App\Models\Notification\NonActiveNotification;
use App\Models\Notification\Notification;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;

class AdminNotificationController extends Controller {
    public function register(RegisterNotificationRequest $request): Response {
        DB::transaction(function () use ($request) {
            $validatedRequest = $request->validated();

            $notification                 = Notification::create(['creator' => auth()->id()]);
            $nonActiveNotificationContent = array_merge(
                [
                    'notification_id' => $notification->notification_id,
                    'creator'         => auth()->id(),
                    'updator'         => auth()->id()
                ],
                $validatedRequest
            );
            NonActiveNotification::create($nonActiveNotificationContent);
        });

        return response('お知らせの作成に成功しました。', 201);
    }
}
