<?php

namespace Tests\Feature\Work\Admin;

use App\Http\Requests\Work\Admin\EditWorkRequest;
use App\Http\Requests\Work\Admin\RegisterWorkRequest;
use App\Models\Work\ActiveWork;
use App\Models\Work\Work;
use Tests\Feature\AlreadyLoggedInTestCase;

class EditWorkTest extends AlreadyLoggedInTestCase {
    public function test_活動実績の編集を行うこと(): void {
        $registerWorkRequest = new RegisterWorkRequest([
            'title'    => 'test',
            'contents' => 'contents',
        ]);

        $createdWorkResponse = $this->post('/api/admin/works', $registerWorkRequest->toArray());
        $createdWorkResponse->assertStatus(201);
        $createdWork = Work::with(['activeWork', 'nonActiveWork'])->first();

        $this->assertEquals($registerWorkRequest->toArray(), [
            'title'    => $createdWork->nonActiveWork->title,
            'contents' => $createdWork->nonActiveWork->contents,
        ]);

        $editWorkRequest = new EditWorkRequest([
            'workId'         => $createdWork->work_id,
            'currentVersion' => $createdWork->version,
            'title'          => 'test2',
            'contents'       => 'contents2',
            'isActive'       => true,
        ]);

        $editedWorkResponse = $this->put('/api/admin/works', $editWorkRequest->toArray());
        $editedWorkResponse->assertStatus(200);
        $activeWork = ActiveWork::find($editWorkRequest->workId);

        $this->assertNotEmpty($activeWork);
        $this->assertEquals($editWorkRequest->toArray(), [
            'workId'         => $activeWork->work_id,
            'currentVersion' => $createdWork->version,
            'title'          => $activeWork->title,
            'contents'       => $activeWork->contents,
            'isActive'       => $activeWork !== null,
        ]);
    }

    public function test_活動実績の排他的制御を行えていること(): void {
        $registerWorkRequest = new RegisterWorkRequest([
            'title'    => 'test',
            'contents' => 'contents',
        ]);

        $createdWorkResponse = $this->post('/api/admin/works', $registerWorkRequest->toArray());
        $createdWorkResponse->assertStatus(201);
        $createdWork = Work::with(['activeWork', 'nonActiveWork'])->first();

        $this->assertEquals($registerWorkRequest->toArray(), [
            'title'    => $createdWork->nonActiveWork->title,
            'contents' => $createdWork->nonActiveWork->contents,
        ]);

        $editWorkRequest = new EditWorkRequest([
            'workId'         => $createdWork->work_id,
            'currentVersion' => $createdWork->version,
            'title'          => 'test2',
            'contents'       => 'contents2',
            'isActive'       => true,
        ]);

        $editedWorkResponse = $this->put('/api/admin/works', $editWorkRequest->toArray());
        $editedWorkResponse->assertStatus(200);
        $editedWorkResponse = $this->put('/api/admin/works', $editWorkRequest->toArray());
        $editedWorkResponse->assertStatus(500);
    }
}
