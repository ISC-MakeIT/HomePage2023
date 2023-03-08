<?php

namespace Tests\Feature\Work\User;

use App\Http\Resources\Work\User\WorksResource;
use App\Models\Work\ActiveWork;
use Illuminate\Http\Request;
use Tests\TestCase;

class WorksTest extends TestCase {
    public function test_活動実績の一覧取得を行うこと(): void {
        $response = $this->get('/api/works');
        $response->assertOk();
        $response->assertJson(
            WorksResource::collection(ActiveWork::all())->toArray(new Request())
        );
    }
}
