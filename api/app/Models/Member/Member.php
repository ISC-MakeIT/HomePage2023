<?php

namespace App\Models\Member;

use App\Domain\Beans\Member\MemberWithAbility;
use App\Exceptions\Member\AlreadyCreatedUserNameOfMember;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Member extends Authenticatable {
    use HasApiTokens;
    use HasFactory;
    use Notifiable;

    public const UPDATED_AT = null;

    protected $primaryKey = 'member_id';

    public static function createMemberWithAbility(MemberWithAbility $memberWithAbility): Member {
        if (ActiveMember::isExistsUserNameBy($memberWithAbility->username())) {
            throw new AlreadyCreatedUserNameOfMember();
        }
        if (NonActiveMember::isExistsUserNameBy($memberWithAbility->username())) {
            throw new AlreadyCreatedUserNameOfMember();
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
            'username'    => $memberWithAbility->username(),
            'password'    => $memberWithAbility->password(),
            'creator'     => $memberWithAbility->creator(),
            'updator'     => $memberWithAbility->updator(),
        ];
        $memberAbilityContent = [
            'member_id' => $member->member_id,
            'role_id'   => $memberWithAbility->roleId(),
            'creator'   => $memberWithAbility->creator(),
            'updator'   => $memberWithAbility->updator(),
        ];
        ActiveMember::create($memberContent);
        MemberAbility::create($memberAbilityContent);

        return $member;
    }
}
