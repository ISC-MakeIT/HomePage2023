<?php

namespace App\Models\Contact;

use Illuminate\Database\Eloquent\Model;

class ContactStartedHistory extends Model
{
    public const UPDATED_AT = null;

    protected $fillable   = [
        'email',
        'name',
        'category',
    ];
}
