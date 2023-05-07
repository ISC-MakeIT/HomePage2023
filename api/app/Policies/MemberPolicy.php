<?php

namespace App\Policies;

use Illuminate\Auth\Access\HandlesAuthorization;
use MakeIT\Member\Domain\Eloquent\Member;

class MemberPolicy
{
    use HandlesAuthorization;

    public function roles(Member $member): bool
    {
        return $member->isAdminOrMore();
    }

    public function changeRole(Member $member): bool
    {
        return $member->isAdminOrMore();
    }

    public function changeActivity(Member $member): bool
    {
        return $member->isAdminOrMore();
    }

    public function changePassword(Member $member): bool
    {
        return $member->isTrialOrMore();
    }

    public function register(Member $member): bool
    {
        return $member->isAdminOrMore();
    }

    public function edit(Member $member): bool
    {
        return $member->isTrialOrMore();
    }

    public function editIcon(Member $member): bool
    {
        return $member->isTrialOrMore();
    }

    public function delete(Member $member): bool
    {
        return $member->isAdminOrMore();
    }

    public function members(Member $member): bool
    {
        return $member->isAdminOrMore();
    }

    public function member(Member $member): bool
    {
        return $member->isAdminOrMore();
    }
}
