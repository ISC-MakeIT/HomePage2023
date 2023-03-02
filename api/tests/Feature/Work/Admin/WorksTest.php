<?php

namespace Tests\Feature\Work\Admin;

use App\Http\Resources\Member\Admin\WorksResource;
use App\Models\Work\Work;
use Illuminate\Http\Request;
use Tests\Feature\AlreadyLoggedInTestCase;

class WorksTest extends AlreadyLoggedInTestCase {
    public function test_活動実績の一覧取得を行うこと(): void {
        $response = $this->get('/api/admin/works');
        $response->assertOk();
        $response->assertJson(
            WorksResource::collection(Work::doesntHave('archiveWork')->with(['activeWork', 'nonActiveWork'])->get())->toArray(new Request())
        );
    }
}
