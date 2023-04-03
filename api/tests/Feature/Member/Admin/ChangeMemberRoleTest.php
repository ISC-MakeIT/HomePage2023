<?php

namespace Tests\Feature\Member\Admin;

use App\Http\Requests\Member\Admin\ChangeRoleRequest;
use App\Models\Member\MemberAbility;
use App\Models\Member\Role;
use Tests\Feature\AlreadyLoggedInTestCase;

class ChangeMemberRoleTest extends AlreadyLoggedInTestCase {
    public function test_メンバーのロールの変更を行うこと(): void {
        $memberAbility = MemberAbility::orderBy('member_id', 'DESC')
            ->first();

        $role    = Role::where('role_id', '<>', $memberAbility->role_id)->first();
        $request = new ChangeRoleRequest([
            'memberId' => $memberAbility->member_id,
            'roleId'   => $role->role_id,
        ]);

        $response = $this->put('/api/admin/members/role', $request->toArray());
        $response->assertOk();
        $this->assertEquals(
            MemberAbility::where('member_id', $memberAbility->member_id)->first()->role_id,
            $request->roleId
        );
    }
}
