<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class () extends Migration {
    private string $tableName = 'active_works';

    public function up(): void {
        Schema::create($this->tableName, function (Blueprint $table) {
            $table->foreignId('work_id')->primary();

            $table->string('title', 255);
            $table->text('contents');
            $table->foreignId('creator');
            $table->timestamps();

            $table->foreign('work_id')->references('work_id')->on('works');
            $table->foreign('creator')->references('member_id')->on('members');
        });
    }

    public function down(): void {
        Schema::drop($this->tableName);
    }
};
