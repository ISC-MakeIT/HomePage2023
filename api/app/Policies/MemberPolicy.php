<?php

namespace App\Policies;

use App\Models\Member\Member;
use Illuminate\Auth\Access\HandlesAuthorization;

class MemberPolicy {
    use HandlesAuthorization;

    public function roles(Member $member): bool {
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
}
