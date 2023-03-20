<?php

namespace Tests\Feature\Member\Admin;

use App\Models\Member\ActiveMember;
use App\Models\Member\Member;
use Illuminate\Support\Facades\Hash;
use Tests\Feature\BaseTestCase;

class MemberLogoutTest extends BaseTestCase {
    public function test_ログアウトを行えること(): void {
        $username = 'admin';
        $password = 'password';

        $member       = Member::create();
        ActiveMember::create([
            'member_id'   => $member->member_id,
            'name'        => 'test',
            'job_title'   => 'Programer',
            'discord'     => null,
            'twitter'     => null,
            'github'      => null,
            'description' => 'test',
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
