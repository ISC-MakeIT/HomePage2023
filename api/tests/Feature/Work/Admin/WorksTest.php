<?php

namespace Tests\Feature\Work\Admin;

use App\Http\Resources\Work\Admin\WorksResource;
use App\Models\Work\Work;
use Database\Seeders\WorkSeeder;
use Faker\Generator;
use Illuminate\Http\Request;
use Tests\Feature\AlreadyLoggedInTestCase;

class WorksTest extends AlreadyLoggedInTestCase {
    public function test_活動実績の一覧取得を行うこと(): void {
        (new WorkSeeder(new Generator()))->run();

        $response = $this->get('/api/admin/works');
        $response->assertOk();
        $response->assertJson(
            WorksResource::collection(Work::doesntHave('archiveWork')
                ->with(['activeWork', 'nonActiveWork'])->get())
                ->toArray(new Request())
        );
    }
}
