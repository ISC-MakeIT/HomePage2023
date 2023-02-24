<?php

namespace App\Models\Member;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Hash;
use Laravel\Sanctum\HasApiTokens;

class NonActiveMember extends Model {
    use HasApiTokens;
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
    ];

    public function getAuthIdentifier() {
        return $this->member_id;
    }

    public function deleteTokensBy(string $currentToken): void {
        $this->tokens()->where('token', $currentToken)->delete();
    }

    public static function isExistsUserNameBy(string $username): bool {
        return NonActiveMember::where('username', $username)->exists();
    }

    public static function getNonActiveMemberIfCanLogin(string $username, string $password): ?ActiveMember {
        if (NonActiveMember::isExistsUserNameBy($username)) {
            $member = NonActiveMember::where('username', $username)->first();
            if (Hash::check($password, $member->password)) {
                return $member;
            }
        }

        return null;
    }
}
