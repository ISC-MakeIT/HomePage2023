<?php

namespace App\Models\Notification;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NonActiveNotification extends Model
{
    use HasFactory;

    public const UPDATED_AT = null;

    protected $primaryKey = 'notification_id';
    protected $fillable   = [
        'notification_id',
        'title',
        'contents',
        'creator',
    ];
}
