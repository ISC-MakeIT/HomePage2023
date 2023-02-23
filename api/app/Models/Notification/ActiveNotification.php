<?php

namespace App\Models\Notification;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ActiveNotification extends Model {
    use HasFactory;

    protected $primaryKey = 'notification_id';
    protected $fillable   = [
        'notification_id',
        'title',
        'contents',
        'creator',
        'updator',
    ];
}
