<?php

namespace Tests\Feature\Member\Admin;

use App\Http\Resources\Member\Admin\MemberResource;
use Database\Seeders\MemberSeeder;
use Illuminate\Http\Request;
use MakeIT\Member\Domain\Eloquent\Member as MemberORM;
use Tests\Feature\AlreadyLoggedInTestCase;

class MemberTest extends AlreadyLoggedInTestCase
{
    public function test_メンバーの詳細取得を行えること(): void
    {
        (new MemberSeeder($this->faker))->run();

        $member = MemberORM::doesntHave('archiveMember')
            ->with(['activeMember', 'nonActiveMember'])
            ->first();
        $response = $this->get("/api/admin/members/{$member->member_id}");
        $response->assertOk();
        $response->assertJson(
            MemberResource::make($member)
                ->toArray(new Request())
        );
    }
}
