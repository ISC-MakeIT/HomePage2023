<?php

namespace Tests\Feature\Work\Admin;

use App\Http\Requests\Work\Admin\RegisterWorkRequest;
use App\Models\Work\NonActiveWork;
use Illuminate\Http\UploadedFile;
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

    public function test_活動実績でThumbnailを含めて作成を行えること(): void {
        $picture = UploadedFile::fake()->image('dummy.jpg', 800, 800);

        $request = new RegisterWorkRequest([
            'title'    => 'test',
            'contents' => 'contents',
            'picture'  => $picture,
        ]);

        $response = $this->post('/api/admin/works', $request->toArray());
        $response->assertStatus(201);
        $createdWork = NonActiveWork::first();

        unset($request['picture']);
        $this->assertFalse(strpos($createdWork->thumbnail, 'default'));
        $this->assertEquals($request->toArray(), [
            'title'    => $createdWork->title,
            'contents' => $createdWork->contents,
        ]);
    }
}
