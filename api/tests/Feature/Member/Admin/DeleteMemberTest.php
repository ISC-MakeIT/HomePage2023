<?php

namespace Tests\Feature\Member\Admin;

use App\Http\Requests\Member\Admin\DeleteMemberRequest;
use App\Http\Requests\Member\Admin\RegisterMemberRequest;
use Illuminate\Http\UploadedFile;
use MakeIT\Member\Domain\Eloquent\ActiveMember as ActiveMemberORM;
use MakeIT\Role\Domain\Eloquent\Role as RoleORM;
use MakeIT\Role\Domain\Entity\RoleName;
use Tests\Feature\AlreadyLoggedInTestCase;

class DeleteMemberTest extends AlreadyLoggedInTestCase
{
    public function test_メンバーの削除を行えること(): void
    {
        $role = RoleORM::where('name', RoleName::MEMBER->toString())->first();
        $icon = UploadedFile::fake()->image('dummy.jpg', 800, 800);

        $registerMemberRequest = new RegisterMemberRequest([
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

        $registedResponse = $this->post('/api/admin/members', $registerMemberRequest->toArray());
        $registedResponse->assertStatus(201);
        $createdMember = ActiveMemberORM::orderBy('member_id', 'DESC')->first();

        $deleteMemberRequest = new DeleteMemberRequest([
            'memberId' => $createdMember->member_id
        ]);
        $response = $this->delete('/api/admin/members', $deleteMemberRequest->toArray());
        $response->assertOk();
    }

    public function test_メンバーの削除を2回行うとエラーが発生すること(): void
    {
        $role                  = RoleORM::where('name', RoleName::MEMBER->toString())->first();
        $icon                  = UploadedFile::fake()->image('dummy.jpg', 800, 800);

        $registerMemberRequest = new RegisterMemberRequest([
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

        $registedResponse = $this->post('/api/admin/members', $registerMemberRequest->toArray());
        $registedResponse->assertStatus(201);
        $createdMember = ActiveMemberORM::orderBy('member_id', 'DESC')->first();

        $deleteMemberRequest = new DeleteMemberRequest([
            'memberId' => $createdMember->member_id
        ]);
        $response = $this->delete('/api/admin/members', $deleteMemberRequest->toArray());
        $response->assertOk();
        $response = $this->delete('/api/admin/members', $deleteMemberRequest->toArray());
        $response->assertNotFound();
    }
}
