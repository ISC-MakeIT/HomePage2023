<?php

namespace Tests\Feature\Notification\Admin;

use App\Http\Resources\Notification\Admin\NotificationsResource;
use App\Models\Notification\Notification;
use Database\Seeders\NotificationSeeder;
use Faker\Generator;
use Illuminate\Http\Request;
use Tests\Feature\AlreadyLoggedInTestCase;

class NotificationsTest extends AlreadyLoggedInTestCase {
    public function test_お知らせの一覧取得を行うこと(): void {
        (new NotificationSeeder(new Generator()))->run();

        $response = $this->get('/api/admin/notifications');
        $response->assertOk();
        $response->assertJson(
            NotificationsResource::collection(
                Notification::doesntHave('archiveNotification')
                    ->with(['activeNotification', 'nonActiveNotification'])
                    ->get()
            )->toArray(new Request())
        );
    }
}
