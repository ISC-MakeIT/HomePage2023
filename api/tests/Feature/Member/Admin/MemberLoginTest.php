<?php

namespace Tests\Feature\Member\Admin;

use Illuminate\Support\Facades\Hash;
use MakeIT\Member\Domain\Eloquent\ActiveMember as ActiveMemberORM;
use MakeIT\Member\Domain\Eloquent\Member as MemberORM;
use Tests\Feature\BaseTestCase;

class MemberLoginTest extends BaseTestCase
{
    public function test_ログインを行えること(): void
    {
        $username = 'admin';
        $password = 'password';

        $member       = MemberORM::create();
        ActiveMemberORM::create([
            'member_id'   => $member->member_id,
            'name'        => 'test',
            'job_title'   => 'Programer',
            'discord'     => null,
            'twitter'     => null,
            'github'      => null,
            'description' => 'test',
            'thumbnail'   => $this->faker->imageUrl(),
            'username'    => $username,
            'password'    => Hash::make($password),
            'creator'     => $member->member_id,
            'updator'     => $member->member_id,
        ]);

        $response = $this->post('/api/admin/login', [
            'username' => $username,
            'password' => $password,
        ]);
        $response->assertOk();
    }

    public function test_ログインを失敗した場合エラーが発生すること(): void
    {
        $username = 'admin';
        $password = 'password';

        $member       = MemberORM::create();
        ActiveMemberORM::create([
            'member_id'   => $member->member_id,
            'name'        => 'test',
            'job_title'   => 'Programer',
            'discord'     => null,
            'twitter'     => null,
            'github'      => null,
            'description' => 'test',
            'thumbnail'   => $this->faker->imageUrl(),
            'username'    => $username,
            'password'    => Hash::make($password),
            'creator'     => $member->member_id,
            'updator'     => $member->member_id,
        ]);

        $username = 'admin1';
        $response = $this->post('/api/admin/login', [
            'username' => $username,
            'password' => $password,
        ]);
        $response->assertStatus(403);
    }
}
