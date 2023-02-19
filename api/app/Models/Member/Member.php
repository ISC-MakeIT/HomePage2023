<?php

namespace App\Models\Member;

use App\Domain\Beans\Member\MemberWithAbility;
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
    protected $fillable = [
    ];

    public static function createMemberWithAbility(MemberWithAbility $memberWithAbility) {
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
        ];
        $memberAbilityContent = [
            'member_id' => $member->member_id,
            'role_id'   => $memberWithAbility->roleId(),
        ];
        /** @var ActiveMember */
        ActiveMember::create($memberContent);
        MemberAbility::create($memberAbilityContent);
    }
}
