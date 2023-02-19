<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class () extends Migration {
    private string $tableName = 'member_abilities';

    public function up(): void {
        Schema::create($this->tableName, function (Blueprint $table) {
            $table->id();

            $table->foreignId('member_id');
            $table->foreignId('role_id');
            $table->timestamp('created_at')->useCurrent();

            $table->foreign('member_id')->references('member_id')->on('members');
            $table->foreign('role_id')->references('role_id')->on('roles');
        });
    }

    public function down(): void {
        Schema::drop($this->tableName);
    }
};
