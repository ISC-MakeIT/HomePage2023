<?php

namespace Tests\Feature\Work\Admin;

use App\Http\Resources\Member\Admin\WorksResource;
use App\Models\Work\Work;
use Database\Seeders\WorkSeeder;
use Faker\Generator;
use Illuminate\Http\Request;
use Tests\Feature\AlreadyLoggedInTestCase;

class WorkTest extends AlreadyLoggedInTestCase {
    public function test_活動実績の詳細取得を行うこと(): void {
        (new WorkSeeder(new Generator()))->run();
        $work = Work::first();

        $response = $this->get("/api/admin/works/{$work->work_id}");
        $response->assertOk();
        $response->assertJson(
            WorksResource::make(
                Work::doesntHave('archiveWork')
                    ->with(['activeWork', 'nonActiveWork'])
                    ->find($work->work_id)
            )->toArray(new Request())
        );
    }

    public function test_活動実績が存在しない場合エラーが発生すること(): void {
        $response = $this->get("/api/admin/works/1111111111");
        $response->assertStatus(400);
    }
}
