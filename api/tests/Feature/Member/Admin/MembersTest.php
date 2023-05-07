<?php

namespace Tests\Feature\Member\Admin;

use App\Http\Resources\Member\Admin\MembersResource;
use App\Models\Member\Member;
use Database\Seeders\MemberSeeder;
use Illuminate\Http\Request;
use Tests\Feature\AlreadyLoggedInTestCase;

class MembersTest extends AlreadyLoggedInTestCase
{
    public function test_メンバーの一覧取得を行うこと(): void
    {
        (new MemberSeeder($this->faker))->run();

        $response = $this->get('/api/admin/members');
        $response->assertOk();
        $response->assertJson(
            MembersResource::collection(
                Member::doesntHave('archiveMember')
                    ->with(['activeMember', 'nonActiveMember'])
                    ->get()
            )->toArray(new Request())
        );
    }
}
