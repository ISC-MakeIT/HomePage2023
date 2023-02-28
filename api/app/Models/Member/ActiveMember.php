<?php

namespace App\Models\Member;

use App\Domain\ValueObjects\Member\RoleName;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Hash;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Support\Str;

class ActiveMember extends Model {
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

    public function toLowerCamelCaseJson(): array {
        return [
            'memberId'    => $this->member_id,
            'name'        => $this->name,
            'jobTitle'    => $this->job_title,
            'discord'     => $this->discord,
            'twitter'     => $this->twitter,
            'github'      => $this->github,
            'description' => $this->description,
        ];
    }

    public function getAuthIdentifier() {
        return $this->member_id;
    }

    public function deleteTokensBy(string $currentToken): void {
        $tokenId = Str::before($currentToken, '|');
        $this->tokens()->where('id', $tokenId)->delete();
    }

    public static function isExistsUserNameBy(string $username): bool {
        return ActiveMember::where('username', $username)->exists();
    }

    public static function getActiveMemberIfCanLogin(string $username, string $password): ?ActiveMember {
        if (ActiveMember::isExistsUserNameBy($username)) {
            $member = ActiveMember::where('username', $username)->first();
            if (Hash::check($password, $member->password)) {
                return $member;
            }
        }

        return null;
    }
}
