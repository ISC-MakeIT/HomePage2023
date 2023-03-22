<?php

namespace App\Console\Commands\Insert;

use App\Domain\ValueObjects\Member\RoleName;
use App\Models\Member\ActiveMember;
use App\Models\Member\Member;
use App\Models\Member\MemberAbility;
use App\Models\Member\Role;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class RandomAdminUser202302261107 extends Command {
    protected $signature   = 'insert:random_admin_member';
    protected $description = 'insert random admin member into the members table';

    public function handle(): void {
        $username = Str::random(16);
        $password = Str::random(16);

        $member = Member::create();
        ActiveMember::create([
            'member_id'   => $member->member_id,
            'name'        => 'Test',
            'job_title'   => 'Programer',
            'discord'     => null,
            'twitter'     => null,
            'github'      => null,
            'description' => 'test',
            'thumbnail'   => '',
            'username'    => $username,
            'password'    => Hash::make($password),
            'creator'     => $member->member_id,
            'updator'     => $member->member_id,
        ]);
        MemberAbility::create([
            'member_id' => $member->member_id,
            'role_id'   => Role::where('name', RoleName::ADMIN->toString())->first()->role_id,
            'creator'   => $member->member_id,
            'updator'   => $member->member_id,
        ]);

        print('Username: ' . $username . "\n");
        print('Password: ' . $password . "\n");
    }
}
