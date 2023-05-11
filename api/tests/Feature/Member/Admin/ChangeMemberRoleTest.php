<?php

namespace Tests\Feature\Member\Admin;

use App\Http\Requests\Member\Admin\ChangeRoleRequest;
use MakeIT\Member\Domain\Eloquent\MemberAbility as MemberAbilityORM;
use MakeIT\Role\Domain\Eloquent\Role as RoleORM;
use Tests\Feature\AlreadyLoggedInTestCase;

class ChangeMemberRoleTest extends AlreadyLoggedInTestCase
{
    public function test_メンバーのロールの変更を行うこと(): void
    {
        $memberAbility = MemberAbilityORM::orderBy('member_id', 'DESC')
            ->first();

        $role    = RoleORM::where('role_id', '<>', $memberAbility->role_id)->first();
        $request = new ChangeRoleRequest([
            'memberId' => $memberAbility->member_id,
            'roleId'   => $role->role_id,
        ]);

        $response = $this->put('/api/admin/members/role', $request->toArray());
        $response->assertOk();
        $this->assertEquals(
            MemberAbilityORM::where('member_id', $memberAbility->member_id)->first()->role_id,
            $request->roleId
        );
    }
}
