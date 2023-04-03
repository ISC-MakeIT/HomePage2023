<?php

namespace Tests\Feature\Notification\Admin;

use App\Http\Resources\Notification\Admin\NotificationsResource;
use App\Models\Notification\Notification;
use Database\Seeders\NotificationSeeder;
use Faker\Generator;
use Illuminate\Http\Request;
use Tests\Feature\AlreadyLoggedInTestCase;

class NotificationTest extends AlreadyLoggedInTestCase {
    public function test_お知らせの詳細取得を行うこと(): void {
        (new NotificationSeeder(new Generator()))->run();

        $notification = Notification::doesntHave('archiveNotification')
            ->with(['activeNotification', 'nonActiveNotification'])
            ->first();
        $response = $this->get("/api/admin/notifications/{$notification->notification_id}");
        $response->assertOk();
        $response->assertJson(
            NotificationsResource::make($notification)->toArray(new Request())
        );
    }
}
