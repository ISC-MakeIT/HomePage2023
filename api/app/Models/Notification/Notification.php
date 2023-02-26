<?php

namespace App\Models\Notification;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Notification extends Model {
    use HasFactory;

    protected $primaryKey = 'notification_id';
    protected $fillable   = [
        'version',
        'creator',
        'updator'
    ];

    public function hasDifferentVersion(int $version): bool {
        return $this->version !== $version;
    }

    public function activeNotification(): HasOne {
        return $this->hasOne(ActiveNotification::class, 'notification_id', 'notification_id');
    }

    public function nonActiveNotification(): HasOne {
        return $this->hasOne(NonActiveNotification::class, 'notification_id', 'notification_id');
    }

    public function archiveNotification(): HasOne {
        return $this->hasOne(ArchiveNotification::class, 'notification_id', 'notification_id');
    }
}
