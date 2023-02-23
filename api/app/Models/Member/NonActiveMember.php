<?php

namespace App\Models\Member;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NonActiveMember extends Model {
    use HasFactory;

    protected $primaryKey = 'member_id';
    protected $fillable   = [
        'member_id',
        'name',
        'job_title',
        'discord',
        'twitter',
        'github',
        'description',
        'username',
        'password',
        'creator',
        'updator'
    ];
    protected $hidden = [
        'password',
    ];

    public static function isExistsUserNameBy(string $username): bool {
        return NonActiveMember::where('username', $username)->exists();
    }
}
