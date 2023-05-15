<?php

namespace MakeIT\Member\Domain\Eloquent;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use MakeIT\Role\Domain\Eloquent\Role;
use MakeIT\Role\Domain\Entity\Admin\RoleName;

class Member extends Authenticatable
{
    use HasApiTokens;
    use HasFactory;
    use Notifiable;

    public const UPDATED_AT = null;

    protected $primaryKey = 'member_id';
    protected $fillable   = [
        'version',
        'creator'
    ];

    public function activeMember(): HasOne
    {
        return $this->hasOne(ActiveMember::class, 'member_id', 'member_id');
    }

    public function nonActiveMember(): HasOne
    {
        return $this->hasOne(NonActiveMember::class, 'member_id', 'member_id');
    }

    public function archiveMember(): HasOne
    {
        return $this->hasOne(ArchiveMember::class, 'member_id', 'member_id');
    }

    public function ability(): HasOne
    {
        return $this->hasOne(MemberAbility::class, 'member_id', 'member_id');
    }

    public function isAdmin(): bool
    {
        return $this->ability()->first()->role_id === Role::where('name', RoleName::ADMIN)->first()->role_id;
    }

    public function isMember(): bool
    {
        return $this->ability()->first()->role_id === Role::where('name', RoleName::MEMBER)->first()->role_id;
    }

    public function isTrial(): bool
    {
        return $this->ability()->first()->role_id === Role::where('name', RoleName::TRIAL)->first()->role_id;
    }

    public function isAdminOrMore(): bool
    {
        return $this->isAdmin();
    }

    public function isMemberOrMore(): bool
    {
        return $this->isMember() || $this->isAdmin();
    }

    public function isTrialOrMore(): bool
    {
        return $this->isTrial() || $this->isMember() || $this->isAdmin();
    }

    public function getMemberId(): int
    {
        return $this->member_id;
    }

    public function getCreator(): int
    {
        return $this->creator;
    }

    public function getVersion(): int
    {
        return $this->version;
    }

    public function getAbility(): ?MemberAbility
    {
        return $this->ability;
    }

    public function getActiveMember(): ?ActiveMember
    {
        return $this->activeMember;
    }

    public function getNonActiveMember(): ?NonActiveMember
    {
        return $this->nonActiveMember;
    }
}
