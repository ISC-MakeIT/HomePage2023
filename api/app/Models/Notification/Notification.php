<?php

namespace App\Models\Notification;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Notification extends Model {
    use HasFactory;

    public const UPDATED_AT = null;

    protected $primaryKey = 'notification_id';
    protected $fillable   = [
        'creator'
    ];
}
