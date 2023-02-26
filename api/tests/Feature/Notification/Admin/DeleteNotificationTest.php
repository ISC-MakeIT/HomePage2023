<?php

namespace Tests\Feature\Notification\Admin;

use App\Http\Requests\Notification\Admin\RegisterNotificationRequest;
use App\Http\Requests\Notification\DeleteNotificationRequest;
use App\Models\Notification\ArchiveNotification;
use App\Models\Notification\Notification;
use Tests\Feature\AlreadyLoggedInTestCase;

class DeleteNotificationTest extends AlreadyLoggedInTestCase {
    public function test_お知らせの削除を行えること(): void {
        $createRequest = new RegisterNotificationRequest([
            'title'    => 'test',
            'contents' => 'contents',
        ]);

        $createdResponse = $this->post('/api/admin/notifications', $createRequest->toArray());
        $createdResponse->assertStatus(201);
        $createdNotification = Notification::first();
        $deleteRequest       = new DeleteNotificationRequest([
            'notificationId' => $createdNotification->notification_id,
        ]);

        $deletedResponse = $this->delete('/api/admin/notifications', $deleteRequest->toArray());
        $deletedResponse->assertOk();
        $archiveNotification = ArchiveNotification::find($createdNotification->notification_id);
        $this->assertNotEmpty($archiveNotification);
        $this->assertEquals($deleteRequest->toArray(), [
            'notificationId' => $archiveNotification->notification_id,
        ]);
    }

    public function test_お知らせの削除を2回行った場合エラーが発生すること(): void {
        $createRequest = new RegisterNotificationRequest([
            'title'    => 'test',
            'contents' => 'contents',
        ]);

        $createdResponse = $this->post('/api/admin/notifications', $createRequest->toArray());
        $createdResponse->assertStatus(201);
        $createdNotification = Notification::first();
        $deleteRequest       = new DeleteNotificationRequest([
            'notificationId' => $createdNotification->notification_id,
        ]);

        $deletedResponse = $this->delete('/api/admin/notifications', $deleteRequest->toArray());
        $deletedResponse->assertOk();
        $archiveNotification = ArchiveNotification::find($createdNotification->notification_id);
        $this->assertNotEmpty($archiveNotification);
        $this->assertEquals($deleteRequest->toArray(), [
            'notificationId' => $archiveNotification->notification_id,
        ]);

        $deletedResponse = $this->delete('/api/admin/notifications', $deleteRequest->toArray());
        $deletedResponse->assertNotFound();
    }
}
