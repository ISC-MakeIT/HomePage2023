<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class () extends Migration {
    private $tableName = 'works';

    public function up(): void {
        Schema::create($this->tableName, function (Blueprint $table) {
            $table->id('work_id');

            $table->foreignId('creator');
            $table->timestamp('created_at')->useCurrent();

            $table->foreign('creator')->references('member_id')->on('members');
        });
    }

    public function down(): void {
        Schema::dropIfExists($this->tableName);
    }
};
