<?php

namespace App\Policies;

use App\Models\Member\Member;
use Illuminate\Auth\Access\HandlesAuthorization;

class MemberPolicy {
    use HandlesAuthorization;

    public function roles(Member $member): bool {
        return $member->isAdminOrMore();
    }

    public function changeRole(Member $member): bool {
        return $member->isAdminOrMore();
    }

    public function changeActive(Member $member): bool {
        return $member->isAdminOrMore();
    }

    public function changePassword(Member $member): bool {
        return $member->isTrialOrMore();
    }

    public function register(Member $member): bool {
        return $member->isAdminOrMore();
    }

    public function edit(Member $member): bool {
        return $member->isTrialOrMore();
    }

    public function delete(Member $member): bool {
        return $member->isAdminOrMore();
    }

    public function members(Member $member): bool {
        return $member->isAdminOrMore();
    }

    public function member(Member $member): bool {
        return $member->isAdminOrMore();
    }
}
