<?php

namespace Tests\Feature\Member\Admin;

use App\Domain\Beans\Member\MemberWithAbility;
use App\Domain\ValueObjects\Member\RoleName;
use App\Http\Requests\Member\Admin\RegisterMemberRequest;
use App\Models\Member\ActiveMember;
use App\Models\Member\MemberAbility;
use App\Models\Member\Role;
use Tests\Feature\AlreadyLoggedInTestCase;

class RegisterMemberTest extends AlreadyLoggedInTestCase {
    protected bool $isLoggedIn = true;

    public function test_メンバーの作成を行えること(): void {
        $role = Role::where('name', RoleName::MEMBER->toString())->first();

        $request = new RegisterMemberRequest([
            'name'        => 'test',
            'jobTitle'    => 'programer',
            'roleId'      => $role->role_id,
            'discord'     => null,
            'twitter'     => null,
            'github'      => null,
            'description' => 'testです',
            'username'    => 'test',
            'password'    => 'password',
        ]);

        $response = $this->post('/api/admin/members', $request->toArray());
        $response->assertStatus(201);
        $createdMember = ActiveMember::orderBy('member_id', 'DESC')->first();
        unset($request['password']);

        $this->assertEquals(
            $request->toArray(),
            [
                'name'        => $createdMember->name,
                'jobTitle'    => $createdMember->job_title,
                'roleId'      => MemberAbility::where('member_id', $createdMember->member_id)->first()->role_id,
                'discord'     => $createdMember->discord,
                'twitter'     => $createdMember->twitter,
                'github'      => $createdMember->github,
                'description' => $createdMember->description,
                'username'    => $createdMember->username,
            ]
        );
    }

    public function test_既に使用されているユーザー名だった場合エラーが発生すること(): void {
        $role = Role::where('name', RoleName::MEMBER->toString())->first();

        $request = new RegisterMemberRequest([
            'name'        => 'test',
            'jobTitle'    => 'programer',
            'roleId'      => $role->role_id,
            'discord'     => null,
            'twitter'     => null,
            'github'      => null,
            'description' => 'testです',
            'username'    => 'test',
            'password'    => 'password',
        ]);

        $response = $this->post('/api/admin/members', $request->toArray());
        $response->assertStatus(201);
        $response = $this->post('/api/admin/members', $request->toArray());
        $response->assertStatus(400);
    }
}
