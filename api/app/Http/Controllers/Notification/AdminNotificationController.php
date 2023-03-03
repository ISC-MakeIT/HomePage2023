<?php

namespace App\Http\Controllers\Notification;

use App\Exceptions\Notification\AlreadyEditedNotificationException;
use App\Http\Controllers\Controller;
use App\Http\Requests\Notification\Admin\EditNotificationRequest;
use App\Http\Requests\Notification\Admin\RegisterNotificationRequest;
use App\Http\Requests\Notification\Admin\DeleteNotificationRequest;
use App\Http\Resources\Notification\Admin\NotificationsResource;
use App\Models\Notification\ActiveNotification;
use App\Models\Notification\ArchiveNotification;
use App\Models\Notification\NonActiveNotification;
use App\Models\Notification\Notification;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;

class AdminNotificationController extends Controller {
    public function register(RegisterNotificationRequest $request): JsonResponse {
        $this->authorize('register', Notification::class);

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
        $this->authorize('edit', Notification::class);

        return DB::transaction(function () use ($request) {
            $validatedRequest = $request->validated();

            /** @var Notification */
            $foundNotification = Notification::doesntHave('archiveNotification')
                ->findOrFail($validatedRequest['notificationId']);
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

    public function delete(DeleteNotificationRequest $request): JsonResponse {
        $this->authorize('delete', Notification::class);

        return DB::transaction(function () use ($request) {
            $validatedRequest = $request->validated();

            $foundNotification = Notification::doesntHave('archiveNotification')
                ->with(['activeNotification', 'nonActiveNotification'])
                ->findOrFail($validatedRequest['notificationId']);

            if ($foundNotification->activeNotification) {
                ArchiveNotification::create([
                    'notification_id' => $foundNotification->activeNotification->notification_id,
                    'title'           => $foundNotification->activeNotification->title,
                    'contents'        => $foundNotification->activeNotification->contents,
                    'creator'         => auth()->id(),
                ]);
                $foundNotification->activeNotification->delete();
                return response()->json(['message' => 'お知らせの削除に成功しました。']);
            }
            if ($foundNotification->nonActiveNotification) {
                ArchiveNotification::create([
                    'notification_id' => $foundNotification->nonActiveNotification->notification_id,
                    'title'           => $foundNotification->nonActiveNotification->title,
                    'contents'        => $foundNotification->nonActiveNotification->contents,
                    'creator'         => auth()->id(),
                ]);
                $foundNotification->nonActiveNotification->delete();
                return response()->json(['message' => 'お知らせの削除に成功しました。']);
            }

            return response()->json(['message' => '予期しないエラーが発生しました。'], 500);
        });
    }

    public function notifications(): JsonResponse {
        $notifications = Notification::doesntHave('archiveNotification')
            ->with(['activeNotification', 'nonActiveNotification'])
            ->get();

        return NotificationsResource::collection($notifications)->response();
    }
}
