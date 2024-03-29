<?php

namespace App\Models\Member;

use App\Domain\Beans\Member\MemberWithAbility;
use App\Domain\ValueObjects\Member\RoleName;
use App\Exceptions\Member\AlreadyCreatedUserNameOfMemberException;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Hash;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Support\Str;

class Member extends Authenticatable {
    use HasApiTokens;
    use HasFactory;
    use Notifiable;

    public const UPDATED_AT = null;

    protected $primaryKey = 'member_id';
    protected $fillable   = [
        'version'
    ];

    public function activeMember(): HasOne {
        return $this->hasOne(ActiveMember::class, 'member_id', 'member_id');
    }

    public function nonActiveMember(): HasOne {
        return $this->hasOne(NonActiveMember::class, 'member_id', 'member_id');
    }

    public function archiveMember(): HasOne {
        return $this->hasOne(ArchiveMember::class, 'member_id', 'member_id');
    }

    public function ability(): HasOne {
        return $this->hasOne(MemberAbility::class, 'member_id', 'member_id');
    }

    public function withActiveMemberIsExistsBy(string $password): bool {
        return $this->activeMember && Hash::check($password, $this->activeMember->password);
    }

    public function withNonActiveMemberIsExistsBy(string $password): bool {
        return $this->nonActiveMember && Hash::check($password, $this->nonActiveMember->password);
    }

    public function deleteTokensBy(string $currentToken): void {
        $tokenId = Str::before($currentToken, '|');
        $this->tokens()->where('id', $tokenId)->delete();
    }

    public function isAdmin(): bool {
        return $this->ability()->first()->role_id === Role::where('name', RoleName::ADMIN)->first()->role_id;
    }

    public function isMember(): bool {
        return $this->ability()->first()->role_id === Role::where('name', RoleName::MEMBER)->first()->role_id;
    }

    public function isTrial(): bool {
        return $this->ability()->first()->role_id === Role::where('name', RoleName::TRIAL)->first()->role_id;
    }

    public function isAdminOrMore(): bool {
        return $this->isAdmin();
    }

    public function isMemberOrMore(): bool {
        return $this->isMember() || $this->isAdmin();
    }

    public function isTrialOrMore(): bool {
        return $this->isTrial() || $this->isMember() || $this->isAdmin();
    }

    public static function createMemberWithAbility(MemberWithAbility $memberWithAbility): Member {
        if (ActiveMember::isExistsUserNameBy($memberWithAbility->username())) {
            throw new AlreadyCreatedUserNameOfMemberException();
        }
        if (NonActiveMember::isExistsUserNameBy($memberWithAbility->username())) {
            throw new AlreadyCreatedUserNameOfMemberException();
        }

        $member               = Member::create();
        $memberContent        = [
            'member_id'   => $member->member_id,
            'name'        => $memberWithAbility->name(),
            'job_title'   => $memberWithAbility->jobTitle(),
            'discord'     => $memberWithAbility->discord(),
            'twitter'     => $memberWithAbility->twitter(),
            'github'      => $memberWithAbility->github(),
            'description' => $memberWithAbility->description(),
            'thumbnail'   => $memberWithAbility->thumbnail(),
            'username'    => $memberWithAbility->username(),
            'password'    => $memberWithAbility->password(),
            'creator'     => $memberWithAbility->creator(),
        ];
        $memberAbilityContent = [
            'member_id' => $member->member_id,
            'role_id'   => $memberWithAbility->roleId(),
            'creator'   => $memberWithAbility->creator(),
            'updator'   => $memberWithAbility->updator(),
        ];
        NonActiveMember::create($memberContent);
        MemberAbility::create($memberAbilityContent);

        return $member;
    }
}
