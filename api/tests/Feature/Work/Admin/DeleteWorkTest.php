<?php

namespace Tests\Feature\Work\Admin;

use App\Http\Requests\Work\Admin\DeleteWorkRequest;
use App\Http\Requests\Work\Admin\RegisterWorkRequest;
use App\Models\Work\ArchiveWork;
use App\Models\Work\NonActiveWork;
use Tests\Feature\AlreadyLoggedInTestCase;

class DeleteWorkTest extends AlreadyLoggedInTestCase {
    public function test_活動実績の削除を行うこと(): void {
        $createWorkRequest = new RegisterWorkRequest([
            'title'    => 'test',
            'contents' => 'contents',
        ]);
        $createdWorkResponse = $this->post('/api/admin/works', $createWorkRequest->toArray());
        $createdWorkResponse->assertStatus(201);
        $createdWork = NonActiveWork::first();

        $deleteWorkRequest = new DeleteWorkRequest([
            'workId' => $createdWork->work_id,
        ]);
        $deletedWorkResponse = $this->delete('/api/admin/works', $deleteWorkRequest->toArray());
        $deletedWorkResponse->assertOk();

        $archiveWork = ArchiveWork::find($createdWork->work_id);
        $this->assertNotEmpty($archiveWork);
        $this->assertEquals($deleteWorkRequest->toArray(), [
            'workId' => $archiveWork->work_id,
        ]);
    }

    public function test_活動実績の削除を2回行った場合エラーが発生すること(): void {
        $createWorkRequest = new RegisterWorkRequest([
            'title'    => 'test',
            'contents' => 'contents',
        ]);
        $createdWorkResponse = $this->post('/api/admin/works', $createWorkRequest->toArray());
        $createdWorkResponse->assertStatus(201);
        $createdWork = NonActiveWork::first();

        $deleteWorkRequest = new DeleteWorkRequest([
            'workId' => $createdWork->work_id,
        ]);
        $deletedWorkResponse = $this->delete('/api/admin/works', $deleteWorkRequest->toArray());
        $deletedWorkResponse->assertOk();
        $deletedWorkResponse = $this->delete('/api/admin/works', $deleteWorkRequest->toArray());
        $deletedWorkResponse->assertNotFound();
    }
}
