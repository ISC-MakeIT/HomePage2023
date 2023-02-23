<?php

namespace Tests\Feature;

use App\Models\Member\ActiveMember;
use App\Models\Member\Member;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class AlreadyLoggedInTestCase extends BaseTestCase {
    use DatabaseTransactions;

    protected function setUp(): void {
        parent::setUp();

        $member = Member::create();
        ActiveMember::create([
            'member_id'   => $member->member_id,
            'name'        => 'test',
            'job_title'   => 'Programer',
            'discord'     => null,
            'twitter'     => null,
            'github'      => null,
            'description' => 'test',
            'username'    => 'admin',
            'password'    => 'password',
            'creator'     => $member->member_id,
            'updator'     => $member->member_id,
        ]);
        $this->actingAs($member);
    }
}
