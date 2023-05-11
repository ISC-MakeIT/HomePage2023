<?php

namespace Tests\Feature\Member\Admin;

use App\Http\Requests\Member\Admin\ChangeActivityRequest;
use Database\Seeders\MemberSeeder;
use MakeIT\Member\Domain\Eloquent\Member as MemberORM;
use Tests\Feature\AlreadyLoggedInTestCase;

class ChangeMemberActiveTest extends AlreadyLoggedInTestCase
{
    public function test_メンバーの活性化の変更を行うこと(): void
    {
        (new MemberSeeder($this->faker))->run();
        $preMember = MemberORM::orderBy('member_id', 'DESC')
            ->first();

        $request = new ChangeActivityRequest([
            'memberId' => $preMember->member_id,
            'isActive' => true,
        ]);

        $response = $this->put('/api/admin/members/activity', $request->toArray());
        $response->assertOk();
        $member = MemberORM::with(['activeMember'])->find($preMember->member_id);
        $this->assertNotEmpty($member->activeMember);
    }
}
