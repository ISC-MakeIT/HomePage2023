<?php

namespace Tests\Feature\Notification\User;

use App\Http\Resources\Notification\User\NotificationsResource;
use App\Models\Notification\ActiveNotification;
use Illuminate\Http\Request;
use Tests\TestCase;

class NotificationsTest extends TestCase
{
    public function test_お知らせ一覧の取得を行うこと(): void
    {
        $response = $this->get('/api/notifications');
        $response->assertOk();
        $response->assertJson(
            NotificationsResource::collection(ActiveNotification::all())
                ->toArray(new Request())
        );
    }
}
