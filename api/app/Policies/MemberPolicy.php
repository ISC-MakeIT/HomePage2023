<?php

namespace App\Policies;

use Illuminate\Auth\Access\HandlesAuthorization;
use MakeIT\Member\Domain\Eloquent\Member as MemberORM;

class MemberPolicy
{
    use HandlesAuthorization;

    public function changeRole(MemberORM $member): bool
    {
        return $member->isAdminOrMore();
    }

    public function changeActivity(MemberORM $member): bool
    {
        return $member->isAdminOrMore();
    }

    public function changePassword(MemberORM $member): bool
    {
        return $member->isTrialOrMore();
    }

    public function register(MemberORM $member): bool
    {
        return $member->isAdminOrMore();
    }

    public function edit(MemberORM $member): bool
    {
        return $member->isTrialOrMore();
    }

    public function editIcon(MemberORM $member): bool
    {
        return $member->isTrialOrMore();
    }

    public function delete(MemberORM $member): bool
    {
        return $member->isAdminOrMore();
    }

    public function members(MemberORM $member): bool
    {
        return $member->isAdminOrMore();
    }

    public function member(MemberORM $member): bool
    {
        return $member->isAdminOrMore();
    }
}
