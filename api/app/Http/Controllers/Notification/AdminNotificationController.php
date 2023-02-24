<?php

namespace App\Http\Controllers\Notification;

use App\Exceptions\Notification\AlreadyEditedNotificationException;
use App\Http\Controllers\Controller;
use App\Http\Requests\Notification\Admin\EditNotificationRequest;
use App\Http\Requests\Notification\Admin\RegisterNotificationRequest;
use App\Models\Notification\ActiveNotification;
use App\Models\Notification\NonActiveNotification;
use App\Models\Notification\Notification;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;

class AdminNotificationController extends Controller {
    public function register(RegisterNotificationRequest $request): JsonResponse {
        DB::transaction(function () use ($request) {
            $validatedRequest = $request->validated();

            $notification = Notification::create([
                'creator' => auth()->id(),
                'updator' => auth()->id()
            ]);
            $nonActiveNotificationContent = array_merge(
                [
                    'notification_id' => $notification->notification_id,
                    'creator'         => auth()->id()
                ],
                $validatedRequest
            );
            NonActiveNotification::create($nonActiveNotificationContent);
        });

        return response()->json(['message' => 'お知らせの作成に成功しました。'], 201);
    }

    public function edit(EditNotificationRequest $request): JsonResponse {
        return DB::transaction(function () use ($request) {
            $validatedRequest = $request->validated();

            /** @var Notification */
            $foundNotification = Notification::findOrFail($validatedRequest['notificationId']);
            if ($foundNotification->hasDifferentVersion($validatedRequest['currentVersion'])) {
                throw new AlreadyEditedNotificationException();
            }

            $foundNotification->activeNotification()->delete();
            $foundNotification->nonActiveNotification()->delete();

            $foundNotification->update([
                'title'    => $validatedRequest['title'],
                'contents' => $validatedRequest['contents'],
                'version'  => $foundNotification->version + 1,
                'updator'  => auth()->id(),
            ]);

            if ($validatedRequest['isActive']) {
                ActiveNotification::create([
                    'notification_id' => $validatedRequest['notificationId'],
                    'title'           => $validatedRequest['title'],
                    'contents'        => $validatedRequest['contents'],
                    'creator'         => auth()->id(),
                ]);
                return response()->json(['message' => 'お知らせ実装の更新に成功しました。']);
            }
            NonActiveNotification::create([
                'notification_id' => $validatedRequest['notificationId'],
                'title'           => $validatedRequest['title'],
                'contents'        => $validatedRequest['contents'],
                'creator'         => auth()->id(),
            ]);
            return response()->json(['message' => 'お知らせ実装の更新に成功しました。']);
        });
    }
}
