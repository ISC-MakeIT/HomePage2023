<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class() extends Migration {
    private array $worksRelationTableNames = [
        'active_works',
        'non_active_works',
        'archive_works',
    ];
    private string $addColumnName = 'thumbnail';

    public function up(): void
    {
        foreach ($this->worksRelationTableNames as $worksRelationTableName) {
            Schema::table($worksRelationTableName, function (Blueprint $table) {
                $table->string($this->addColumnName, 2048)->default('https://makeit-homepage-for-prd.s3.ap-northeast-1.amazonaws.com/image/imagesForWork/thumbnail/default.jpg')->after('contents');
            });
        }
    }

    public function down(): void
    {
        foreach ($this->worksRelationTableNames as $worksRelationTableName) {
            Schema::table($worksRelationTableName, function (Blueprint $table) {
                $table->dropColumn($this->addColumnName);
            });
        }
    }
};
