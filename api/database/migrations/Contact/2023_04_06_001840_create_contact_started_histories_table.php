<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class () extends Migration {
    private string $tableName = 'contact_started_histories';

    public function up(): void {
        Schema::create($this->tableName, function (Blueprint $table) {
            $table->id();

            $table->string('email', 320);
            $table->string('name', 255);
            $table->string('category', 255);

            $table->timestamp('created_at')->useCurrent();
        });
    }

    public function down(): void {
        Schema::drop($this->tableName);
    }
};
