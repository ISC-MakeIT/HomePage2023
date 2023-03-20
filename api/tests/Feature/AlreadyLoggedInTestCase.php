<?php

namespace Tests\Feature;

use App\Domain\ValueObjects\Member\RoleName;
use App\Models\Member\ActiveMember;
use App\Models\Member\Member;
use App\Models\Member\MemberAbility;
use App\Models\Member\Role;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Support\Facades\Hash;

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
            'password'    => Hash::make('password'),
            'creator'     => $member->member_id,
            'updator'     => $member->member_id,
        ]);
        MemberAbility::create([
            'member_id' => $member->member_id,
            'role_id'   => Role::where('name', RoleName::ADMIN->toString())->first()->role_id,
            'creator'   => $member->member_id,
            'updator'   => $member->member_id,
        ]);
        $this->actingAs($member);
    }
}
