<?php

namespace App\Models\Work;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Work extends Model {
    use HasFactory;

    public const UPDATED_AT = null;

    protected $primaryKey = 'work_id';
    protected $fillable   = [
        'version',
        'creator',
        'updator',
    ];

    public function hasDifferentVersion(int $version): bool {
        return $this->version !== $version;
    }

    public function activeWork(): HasOne {
        return $this->hasOne(ActiveWork::class, 'work_id', 'work_id');
    }

    public function nonActiveWork(): HasOne {
        return $this->hasOne(NonActiveWork::class, 'work_id', 'work_id');
    }

    public function archiveWork(): HasOne {
        return $this->hasOne(ArchiveWork::class, 'work_id', 'work_id');
    }
}
