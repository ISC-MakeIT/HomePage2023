<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class() extends Migration {
    private string $tableName = 'roles';

    public function up(): void
    {
        Schema::create($this->tableName, function (Blueprint $table) {
            $table->id('role_id');

            $table->string('name', 255)->unique();
            $table->timestamp('created_at')->useCurrent();
        });
    }

    public function down(): void
    {
        Schema::drop($this->tableName);
    }
};
