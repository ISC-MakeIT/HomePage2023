<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class() extends Migration {
    private string $tableName = 'non_active_members';

    public function up(): void
    {
        Schema::create($this->tableName, function (Blueprint $table) {
            $table->foreignId('member_id')->primary();

            $table->string('name', 255);
            $table->string('job_title', 255);
            $table->string('discord', 255)->nullable();
            $table->string('twitter', 255)->nullable();
            $table->string('github', 255)->nullable();
            $table->string('description', 255);
            $table->string('thumbnail', 2048);
            $table->string('username', 255);
            $table->string('password', 255);
            $table->foreignId('creator');
            $table->timestamps();

            $table->foreign('member_id')->references('member_id')->on('members');
            $table->foreign('creator')->references('member_id')->on('members');
        });
    }

    public function down(): void
    {
        Schema::drop($this->tableName);
    }
};
