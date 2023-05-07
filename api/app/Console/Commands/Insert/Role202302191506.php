<?php

namespace App\Console\Commands\Insert;

use App\Domain\ValueObjects\Member\RoleName;
use App\Models\Member\Role;
use Illuminate\Console\Command;

class Role202302191506 extends Command
{
    protected $signature   = 'insert:role_202302191506';
    protected $description = 'insert role names into the roles table';

    public function handle(): void
    {
        foreach (RoleName::cases() as $roleName) {
            Role::create(['name' => $roleName->toString()]);
        }
    }
}
