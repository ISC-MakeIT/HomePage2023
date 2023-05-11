<?php

namespace Tests\Feature\Member\Admin;

use Illuminate\Support\Facades\Hash;
use MakeIT\Member\Domain\Eloquent\ActiveMember as ActiveMemberORM;
use MakeIT\Member\Domain\Eloquent\Member as MemberORM;
use Tests\Feature\BaseTestCase;

class MemberLogoutTest extends BaseTestCase
{
    public function test_ログアウトを行えること(): void
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

        $loginResponse = $this->post('/api/admin/login', [
            'username' => $username,
            'password' => $password,
        ]);
        $loginResponse->assertOk();

        $logoutResponse = $this->post('/api/admin/logout', [], [
            'Authorization' => 'Bearer ' . $loginResponse->json()['token'],
        ]);
        $logoutResponse->assertOk();
    }
}
