<?php

namespace Database\Seeders;

use App\Models\Member\Member;
use App\Models\Notification\ActiveNotification;
use App\Models\Notification\NonActiveNotification;
use App\Models\Notification\Notification;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use Faker\Generator as Faker;

class NotificationSeeder extends Seeder
{
    private Faker $faker;

    public function __construct(Faker $faker)
    {
        $this->faker = $faker;
    }

    public function run(): void
    {
        $creatorMember = Member::first();

        for ($i = 0; $i < $this->faker->numberBetween(5, 60); $i++) {
            $notification = Notification::create([
                'creator' => $creatorMember->member_id,
                'updator' => $creatorMember->member_id,
            ]);
            if ($i % 2 === 0) {
                ActiveNotification::create([
                    'notification_id'  => $notification->notification_id,
                    'title'            => Str::random(100),
                    'contents'         => Str::random(500),
                    'creator'          => $creatorMember->member_id,
                ]);
                continue;
            }
            NonActiveNotification::create([
                'notification_id' => $notification->notification_id,
                'title'           => Str::random(100),
                'contents'        => Str::random(500),
                'creator'         => $creatorMember->member_id,
            ]);
        }
    }
}
