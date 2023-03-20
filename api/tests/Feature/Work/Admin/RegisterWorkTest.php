<?php

namespace Tests\Feature\Work\Admin;

use App\Http\Requests\Work\Admin\RegisterWorkRequest;
use App\Models\Work\NonActiveWork;
use Tests\Feature\AlreadyLoggedInTestCase;

class RegisterWorkTest extends AlreadyLoggedInTestCase {
    public function test_活動実績の作成を行えること(): void {
        $request = new RegisterWorkRequest([
            'title'    => 'test',
            'contents' => 'contents',
        ]);

        $response = $this->post('/api/admin/works', $request->toArray());
        $response->assertStatus(201);
        $createdWork = NonActiveWork::first();

        $this->assertEquals($request->toArray(), [
            'title'    => $createdWork->title,
            'contents' => $createdWork->contents,
        ]);
    }
}
