<?php

namespace Tests\Feature\Notification\Admin;

use App\Http\Requests\Notification\Admin\RegisterNotificationRequest;
use App\Models\Notification\NonActiveNotification;
use Tests\Feature\AlreadyLoggedInTestCase;

class RegisterNotificationTest extends AlreadyLoggedInTestCase
{
    protected bool $isLoggedIn = true;

    public function test_お知らせの作成を行えること(): void
    {
        $request = new RegisterNotificationRequest([
            'title'    => 'test',
            'contents' => 'contents',
        ]);

        $response = $this->post('/api/admin/notifications', $request->toArray());
        $response->assertStatus(201);
        $createdNotification = NonActiveNotification::first();

        $this->assertEquals($request->toArray(), [
            'title'    => $createdNotification->title,
            'contents' => $createdNotification->contents,
        ]);
    }
}
