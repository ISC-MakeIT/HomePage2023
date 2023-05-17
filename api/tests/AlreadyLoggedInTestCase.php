<?php

namespace Tests;

use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Hash;
use MakeIT\Member\Domain\Entity\Admin\MemberConstant;
use MakeIT\Member\Domain\Eloquent\Member as MemberORM;
use MakeIT\Member\Domain\Eloquent\ActiveMember as ActiveMemberORM;
use MakeIT\Member\Domain\Eloquent\MemberAbility as MemberAbilityORM;
use MakeIT\Role\Domain\Eloquent\Role as RoleORM;
use MakeIT\Role\Domain\Entity\Admin\RoleName;

class AlreadyLoggedInTestCase extends BaseTestCase
{
    use DatabaseTransactions;
    use WithFaker;

    protected function setUp(): void
    {
        parent::setUp();

        /** @var MemberORM */
        $member = MemberORM::create([
            'version' => 0,
            'creator' => 1,
        ]);
        ActiveMemberORM::create([
            'member_id'   => $member->getMemberId(),
            'name'        => 'test',
            'job_title'   => 'Programer',
            'discord'     => MemberConstant::MEMBER_SNS_DEFAULT_VALUE,
            'twitter'     => MemberConstant::MEMBER_SNS_DEFAULT_VALUE,
            'github'      => MemberConstant::MEMBER_SNS_DEFAULT_VALUE,
            'description' => 'test',
            'thumbnail'   => $this->faker->imageUrl(),
            'username'    => 'admin',
            'password'    => Hash::make('password'),
            'creator'     => $member->getMemberId(),
            'updator'     => $member->getMemberId(),
        ]);
        MemberAbilityORM::create([
            'member_id' => $member->getMemberId(),
            'role_id'   => RoleORM::where('name', RoleName::ADMIN->toString())->first()->role_id,
            'creator'   => $member->getMemberId(),
            'updator'   => $member->getMemberId(),
        ]);
        $this->actingAs($member);
    }
}