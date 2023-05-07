<?php

namespace Tests\Feature\Member\Admin;

use App\Http\Requests\Member\Admin\ChangeActiveRequest;
use App\Models\Member\Member;
use Database\Seeders\MemberSeeder;
use Tests\Feature\AlreadyLoggedInTestCase;

class ChangeMemberActiveTest extends AlreadyLoggedInTestCase
{
    public function test_メンバーの活性化の変更を行うこと(): void
    {
        (new MemberSeeder($this->faker))->run();
        $preMember = Member::orderBy('member_id', 'DESC')
            ->first();

        $request = new ChangeActiveRequest([
            'memberId' => $preMember->member_id,
            'isActive' => true,
        ]);

        $response = $this->put('/api/admin/members/active', $request->toArray());
        $response->assertOk();
        $member = Member::with(['activeMember'])->find($preMember->member_id);
        $this->assertNotEmpty($member->activeMember);
    }
}
