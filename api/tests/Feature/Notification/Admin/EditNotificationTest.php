<?php

namespace Tests\Feature\Notification\Admin;

use App\Http\Requests\Notification\Admin\EditNotificationRequest;
use App\Http\Requests\Notification\Admin\RegisterNotificationRequest;
use App\Models\Notification\ActiveNotification;
use App\Models\Notification\Notification;
use Tests\Feature\AlreadyLoggedInTestCase;

class EditNotificationTest extends AlreadyLoggedInTestCase {
    public function test_お知らせの編集を行えること(): void {
        $createRequest = new RegisterNotificationRequest([
            'title'    => 'test',
            'contents' => 'contents',
        ]);

        $createdResponse = $this->post('/api/admin/notifications', $createRequest->toArray());
        $createdResponse->assertStatus(201);
        $createdNotification = Notification::first();

        $editRequest = new EditNotificationRequest([
            'notificationId' => $createdNotification->notification_id,
            'currentVersion' => $createdNotification->version,
            'isActive'       => true,
            'title'          => 'test1',
            'contents'       => 'contents1',
        ]);

        $editedResponse = $this->put('/api/admin/notifications', $editRequest->toArray());
        $editedResponse->assertOk();
        $activeNotification = ActiveNotification::find($createdNotification->notification_id);
        $this->assertNotEmpty($activeNotification);
        $this->assertEquals($editRequest->toArray(), [
            'notificationId' => $createdNotification->notification_id,
            'currentVersion' => $createdNotification->version,
            'isActive'       => $activeNotification !== null,
            'title'          => $activeNotification->title,
            'contents'       => $activeNotification->contents,
        ]);
    }

    public function test_お知らせの排他的制御を行えていること(): void {
        $createRequest = new RegisterNotificationRequest([
            'title'    => 'test',
            'contents' => 'contents',
        ]);

        $createdResponse = $this->post('/api/admin/notifications', $createRequest->toArray());
        $createdResponse->assertStatus(201);
        $createdNotification = Notification::first();

        $editRequest = new EditNotificationRequest([
            'notificationId' => $createdNotification->notification_id,
            'currentVersion' => $createdNotification->version,
            'isActive'       => true,
            'title'          => 'test1',
            'contents'       => 'contents1',
        ]);

        $editedResponse = $this->put('/api/admin/notifications', $editRequest->toArray());
        $editedResponse->assertOk();
        $editedResponse = $this->put('/api/admin/notifications', $editRequest->toArray());
        $editedResponse->assertStatus(500);
    }
}
