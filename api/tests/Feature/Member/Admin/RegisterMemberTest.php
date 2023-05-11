<?php

namespace Tests\Feature\Member\Admin;

use App\Http\Requests\Member\Admin\RegisterMemberRequest;
use Illuminate\Http\UploadedFile;
use MakeIT\Member\Domain\Eloquent\MemberAbility as MemberAbilityORM;
use MakeIT\Member\Domain\Eloquent\NonActiveMember as NonActiveMemberORM;
use MakeIT\Role\Domain\Eloquent\Role as RoleORM;
use MakeIT\Role\Domain\Entity\RoleName;
use Tests\Feature\AlreadyLoggedInTestCase;

class RegisterMemberTest extends AlreadyLoggedInTestCase
{
    public function test_メンバーの作成を行えること(): void
    {
        $role = RoleORM::where('name', RoleName::MEMBER->toString())->first();
        $icon = UploadedFile::fake()->image('dummy.jpg', 800, 800);

        $request = new RegisterMemberRequest([
            'name'        => 'test',
            'jobTitle'    => 'programer',
            'roleId'      => $role->role_id,
            'discord'     => null,
            'twitter'     => null,
            'github'      => null,
            'description' => 'testです',
            'icon'        => $icon,
            'username'    => 'test',
            'password'    => 'password',
        ]);

        $response = $this->post('/api/admin/members', $request->toArray());
        $response->assertStatus(201);
        $createdMember = NonActiveMemberORM::orderBy('member_id', 'DESC')->first();
        unset($request['password'], $request['icon']);

        $this->assertEquals(
            $request->toArray(),
            [
                'name'        => $createdMember->name,
                'jobTitle'    => $createdMember->job_title,
                'roleId'      => MemberAbilityORM::where('member_id', $createdMember->member_id)->first()->role_id,
                'discord'     => $createdMember->discord,
                'twitter'     => $createdMember->twitter,
                'github'      => $createdMember->github,
                'description' => $createdMember->description,
                'username'    => $createdMember->username,
            ]
        );
    }

    public function test_既に使用されているユーザー名だった場合エラーが発生すること(): void
    {
        $role = RoleORM::where('name', RoleName::MEMBER->toString())->first();
        $icon = UploadedFile::fake()->image('dummy.jpg', 800, 800);

        $request = new RegisterMemberRequest([
            'name'        => 'test',
            'jobTitle'    => 'programer',
            'roleId'      => $role->role_id,
            'discord'     => null,
            'twitter'     => null,
            'icon'        => $icon,
            'github'      => null,
            'description' => 'testです',
            'icon'        => $icon,
            'username'    => 'test',
            'password'    => 'password',
        ]);

        $response = $this->post('/api/admin/members', $request->toArray());
        $response->assertStatus(201);
        $response = $this->post('/api/admin/members', $request->toArray());
        $response->assertStatus(400);
    }
}
