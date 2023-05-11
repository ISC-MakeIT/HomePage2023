<?php

namespace Tests\Feature\Member\Admin;

use App\Http\Resources\Member\Admin\MemberResource;
use Database\Seeders\MemberSeeder;
use Illuminate\Http\Request;
use MakeIT\Member\Domain\Eloquent\Member as MemberORM;
use Tests\Feature\AlreadyLoggedInTestCase;

class MembersTest extends AlreadyLoggedInTestCase
{
    public function test_メンバーの一覧取得を行うこと(): void
    {
        (new MemberSeeder($this->faker))->run();

        $response = $this->get('/api/admin/members');
        $response->assertOk();
        $response->assertJson(
            MemberResource::collection(
                MemberORM::doesntHave('archiveMember')
                    ->with(['activeMember', 'nonActiveMember'])
                    ->get()
            )->toArray(new Request())
        );
    }
}
