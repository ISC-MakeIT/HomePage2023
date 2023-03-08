<?php

namespace Tests\Feature\Member\Admin;

use App\Http\Resources\Member\Admin\MembersResource;
use App\Models\Member\Member;
use Database\Seeders\MemberSeeder;
use Faker\Generator;
use Illuminate\Http\Request;
use Tests\Feature\AlreadyLoggedInTestCase;

class MemberTest extends AlreadyLoggedInTestCase {
    public function test_メンバーの詳細取得を行えること(): void {
        (new MemberSeeder(new Generator()))->run();

        $member = Member::doesntHave('archiveMember')
            ->with(['activeMember', 'nonActiveMember'])
            ->first();
        $response = $this->get("/api/admin/members/{$member->member_id}");
        $response->assertOk();
        $response->assertJson(
            MembersResource::make($member)
                ->toArray(new Request())
        );
    }
}
