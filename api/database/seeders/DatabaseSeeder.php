<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder {
    public function run(): void {
        $this->call([
            WorkSeeder::class,
            NotificationSeeder::class,
            MemberSeeder::class
        ]);
    }
}
