<?php

namespace App\Models\Member;

use App\Domain\ValueObjects\Member\RoleName;
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
        'picture',
        'creator',
    ];

    public function getAuthIdentifier() {
        return $this->member_id;
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

    public function isAdmin(): bool {
        return $this->role_id === Role::where('name', RoleName::ADMIN)->first()->role_id;
    }

    public function isMember(): bool {
        return $this->role_id === Role::where('name', RoleName::MEMBER)->first()->role_id;
    }

    public function isTrial(): bool {
        return $this->role_id === Role::where('name', RoleName::TRIAL)->first()->role_id;
    }
}
