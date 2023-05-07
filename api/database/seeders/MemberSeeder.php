<?php

namespace Database\Seeders;

use App\Models\Member\ActiveMember;
use App\Models\Member\Member;
use App\Models\Member\MemberAbility;
use App\Models\Member\NonActiveMember;
use App\Models\Member\Role;
use Faker\Generator as Faker;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

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
            $member = Member::create();

            if ($i % 2 === 0) {
                ActiveMember::create([
                    'member_id'   => $member->member_id,
                    'name'        => Str::random(50),
                    'job_title'   => Str::random(50),
                    'discord'     => null,
                    'twitter'     => null,
                    'github'      => null,
                    'thumbnail'   => $this->faker->imageUrl(),
                    'description' => Str::random(100),
                    'username'    => Str::random(50),
                    'password'    => Hash::make('password'),
                    'creator'     => $member->member_id,
                ]);
                MemberAbility::create([
                    'member_id' => $member->member_id,
                    'role_id'   => Role::where('role_id', $this->faker->numberBetween(1, Role::count()))
                        ->first()
                        ->role_id,
                    'creator'   => $member->member_id,
                    'updator'   => $member->member_id,
                ]);
                continue;
            }
            NonActiveMember::create([
                'member_id'   => $member->member_id,
                'name'        => Str::random(50),
                'job_title'   => Str::random(50),
                'discord'     => null,
                'twitter'     => null,
                'github'      => null,
                'description' => Str::random(100),
                'thumbnail'   => $this->faker->imageUrl(),
                'username'    => Str::random(50),
                'password'    => Hash::make('password'),
                'creator'     => $member->member_id,
            ]);
            MemberAbility::create([
                'member_id' => $member->member_id,
                'role_id'   => Role::where('role_id', $this->faker->numberBetween(1, Role::count()))
                    ->first()
                    ->role_id,
                'creator'   => $member->member_id,
                'updator'   => $member->member_id,
            ]);
        }
    }
}
