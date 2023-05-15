<?php

namespace App\Policies;

use Illuminate\Auth\Access\HandlesAuthorization;
use MakeIT\Member\Domain\Eloquent\Member as MemberORM;

class RolePolicy
{
    use HandlesAuthorization;

    public function roles(MemberORM $member): bool
    {
        return $member->isAdminOrMore();
    }
}
