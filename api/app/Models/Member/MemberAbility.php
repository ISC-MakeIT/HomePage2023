<?php

namespace App\Models\Member;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class MemberAbility extends Model {
    use HasFactory;

    public const UPDATED_AT = null;

    protected $fillable = [
        'member_id',
        'role_id',
        'creator',
        'updator',
    ];

    public function role(): HasOne {
        return $this->hasOne(Role::class, 'role_id', 'role_id');
    }
}
