<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    private string $tableName  = 'members';
    private string $columnName = 'creator';

    public function up(): void
    {
        Schema::table($this->tableName, function (Blueprint $table) {
            $table->foreignId($this->columnName)->after('version')->default(1);

            $table->foreign($this->columnName)->references('member_id')->on('members');
        });
    }

    public function down(): void
    {
        Schema::table($this->tableName, function (Blueprint $table) {
            $table->dropColumn($this->columnName);
        });
    }
};
