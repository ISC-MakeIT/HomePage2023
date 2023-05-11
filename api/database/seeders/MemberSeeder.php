<?php

namespace Database\Seeders;

use Faker\Generator as Faker;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use MakeIT\Member\Domain\Eloquent\Member as MemberORM;
use MakeIT\Member\Domain\Eloquent\ActiveMember as ActiveMemberORM;
use MakeIT\Member\Domain\Eloquent\MemberAbility as MemberAbilityORM;
use MakeIT\Member\Domain\Eloquent\NonActiveMember as NonActiveMemberORM;
use MakeIT\Role\Domain\Eloquent\Role as RoleORM;

class MemberSeeder extends Seeder
{
    private Faker $faker;

    public function __construct(Faker $faker)
    {
        $this->faker = $faker;
    }

    public function run(): void
    {
        for ($i = 0; $i < $this->faker->numberBetween(3, 5); $i++) {
            $member = MemberORM::create();

            if ($i % 2 === 0) {
                ActiveMemberORM::create([
                    'member_id'   => $member->member_id,
                    'name'        => Str::random(50),
                    'job_title'   => Str::random(50),
                    'discord'     => Str::random(10),
                    'twitter'     => Str::random(10),
                    'github'      => Str::random(10),
                    'thumbnail'   => $this->faker->imageUrl(),
                    'description' => Str::random(100),
                    'username'    => Str::random(50),
                    'password'    => Hash::make('password'),
                    'creator'     => $member->member_id,
                ]);
                MemberAbilityORM::create([
                    'member_id' => $member->member_id,
                    'role_id'   => RoleORM::where('role_id', $this->faker->numberBetween(1, RoleORM::count()))
                        ->first()
                        ->role_id,
                    'creator'   => $member->member_id,
                    'updator'   => $member->member_id,
                ]);
                continue;
            }
            NonActiveMemberORM::create([
                'member_id'   => $member->member_id,
                'name'        => Str::random(50),
                'job_title'   => Str::random(50),
                'discord'     => Str::random(10),
                'twitter'     => Str::random(10),
                'github'      => Str::random(10),
                'description' => Str::random(100),
                'thumbnail'   => $this->faker->imageUrl(),
                'username'    => Str::random(50),
                'password'    => Hash::make('password'),
                'creator'     => $member->member_id,
            ]);
            MemberAbilityORM::create([
                'member_id' => $member->member_id,
                'role_id'   => RoleORM::where('role_id', $this->faker->numberBetween(1, RoleORM::count()))
                    ->first()
                    ->role_id,
                'creator'   => $member->member_id,
                'updator'   => $member->member_id,
            ]);
        }
    }
}
