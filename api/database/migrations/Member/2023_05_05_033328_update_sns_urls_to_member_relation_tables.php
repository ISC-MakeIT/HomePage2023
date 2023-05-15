<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use MakeIT\Member\Domain\Entity\Admin\MemberConstant;

return new class extends Migration {
    private array $memberRelationTableNames = [
        'active_members',
        'non_active_members',
        'archive_members',
    ];
    private array $columnNames = [
        'discord',
        'github',
        'twitter',
    ];

    public function up(): void
    {
        foreach ($this->memberRelationTableNames as $memberRelationTableName) {
            Schema::table($memberRelationTableName, function (Blueprint $table) {
                foreach ($this->columnNames as $columnName) {
                    $table->string($columnName)->nullable()->default(MemberConstant::MEMBER_SNS_DEFAULT_VALUE)->change();
                }
            });
        }
    }

    public function down(): void
    {
        foreach ($this->memberRelationTableNames as $memberRelationTableName) {
            Schema::table($memberRelationTableName, function (Blueprint $table) {
                foreach ($this->columnNames as $columnName) {
                    $table->string($columnName)->nullable(false)->default(null)->change();
                }
            });
        }
    }
};
