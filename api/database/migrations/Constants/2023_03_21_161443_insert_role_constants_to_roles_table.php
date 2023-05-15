<?php

use Illuminate\Database\Migrations\Migration;
use MakeIT\Role\Domain\Eloquent\Role;
use MakeIT\Role\Domain\Entity\Admin\RoleName;

return new class() extends Migration {
    public function up(): void
    {
        foreach (RoleName::cases() as $roleName) {
            Role::create(['name' => $roleName->toString()]);
        }
    }

    public function down(): void
    {
        foreach (RoleName::cases() as $roleName) {
            Role::where(['name' => $roleName->toString()])->delete();
        }
    }
};
