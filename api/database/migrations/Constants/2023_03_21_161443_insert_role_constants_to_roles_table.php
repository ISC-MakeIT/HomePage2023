<?php

use App\Domain\ValueObjects\Member\RoleName;
use App\Models\Member\Role;
use Illuminate\Database\Migrations\Migration;

return new class () extends Migration {
    public function up(): void {
        foreach (RoleName::cases() as $roleName) {
            Role::create(['name' => $roleName->toString()]);
        }
    }

    public function down(): void {
        foreach (RoleName::cases() as $roleName) {
            Role::where(['name' => $roleName->toString()])->delete();
        }
    }
};
