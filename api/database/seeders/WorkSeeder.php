<?php

namespace Database\Seeders;

use MakeIT\Member\Domain\Eloquent\Member as MemberORM;
use App\Models\Work\ActiveWork;
use App\Models\Work\NonActiveWork;
use App\Models\Work\Work;
use Faker\Generator as Faker;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class WorkSeeder extends Seeder
{
    private Faker $faker;

    public function __construct(Faker $faker)
    {
        $this->faker = $faker;
    }

    public function run(): void
    {
        $creatorMember = MemberORM::first();

        for ($i = 0; $i < $this->faker->numberBetween(5, 60); $i++) {
            $work = Work::create([
                'creator' => $creatorMember->member_id,
                'updator' => $creatorMember->member_id,
            ]);
            if ($i % 2 === 0) {
                ActiveWork::create([
                    'work_id'  => $work->work_id,
                    'title'    => Str::random(100),
                    'contents' => Str::random(500),
                    'creator'  => $creatorMember->member_id,
                ]);
                continue;
            }
            NonActiveWork::create([
                'work_id'  => $work->work_id,
                'title'    => Str::random(100),
                'contents' => Str::random(500),
                'creator'  => $creatorMember->member_id,
            ]);
        }
    }
}
