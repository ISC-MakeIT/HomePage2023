<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class() extends Migration {
    private string $tableName = 'notifications';

    public function up(): void
    {
        Schema::create($this->tableName, function (Blueprint $table) {
            $table->id('notification_id');

            $table->bigInteger('version', false, false)->default(0);
            $table->foreignId('creator');
            $table->foreignId('updator');
            $table->timestamps();

            $table->foreign('creator')->references('member_id')->on('members');
            $table->foreign('updator')->references('member_id')->on('members');
        });
    }

    public function down(): void
    {
        Schema::drop($this->tableName);
    }
};
