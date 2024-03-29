<?php

namespace App\Models\Member;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ArchiveMember extends Model {
    use HasFactory;

    public const UPDATED_AT = null;

    protected $primaryKey = 'member_id';
    protected $fillable   = [
        'member_id',
        'name',
        'job_title',
        'discord',
        'twitter',
        'github',
        'description',
        'thumbnail',
        'username',
        'password',
        'creator'
    ];
    protected $hidden = [
        'password',
    ];
}
