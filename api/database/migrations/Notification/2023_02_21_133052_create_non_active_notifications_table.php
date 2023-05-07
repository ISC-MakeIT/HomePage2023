<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class() extends Migration {
    private string $tableName = 'non_active_notifications';

    public function up(): void
    {
        Schema::create($this->tableName, function (Blueprint $table) {
            $table->foreignId('notification_id')->primary();

            $table->string('title', 255);
            $table->text('contents');
            $table->foreignId('creator');
            $table->timestamp('created_at')->useCurrent();

            $table->foreign('notification_id')->references('notification_id')->on('notifications');
            $table->foreign('creator')->references('member_id')->on('members');
        });
    }

    public function down(): void
    {
        Schema::drop($this->tableName);
    }
};
