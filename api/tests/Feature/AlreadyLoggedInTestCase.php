<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Hash;
use MakeIT\Member\Domain\Eloquent\Member as MemberORM;
use MakeIT\Member\Domain\Eloquent\ActiveMember as ActiveMemberORM;
use MakeIT\Member\Domain\Eloquent\MemberAbility as MemberAbilityORM;
use MakeIT\Role\Domain\Eloquent\Role as RoleORM;
use MakeIT\Role\Domain\Entity\RoleName;

class AlreadyLoggedInTestCase extends BaseTestCase
{
    use DatabaseTransactions;
    use WithFaker;

    protected function setUp(): void
    {
        parent::setUp();

        $member = MemberORM::create([
            'version' => 0,
            'creator' => 1,
        ]);
        ActiveMemberORM::create([
            'member_id'   => $member->member_id,
            'name'        => 'test',
            'job_title'   => 'Programer',
            'discord'     => null,
            'twitter'     => null,
            'github'      => null,
            'description' => 'test',
            'thumbnail'   => $this->faker->imageUrl(),
            'username'    => 'admin',
            'password'    => Hash::make('password'),
            'creator'     => $member->member_id,
            'updator'     => $member->member_id,
        ]);
        MemberAbilityORM::create([
            'member_id' => $member->member_id,
            'role_id'   => RoleORM::where('name', RoleName::ADMIN->toString())->first()->role_id,
            'creator'   => $member->member_id,
            'updator'   => $member->member_id,
        ]);
        $this->actingAs($member);
    }
}
