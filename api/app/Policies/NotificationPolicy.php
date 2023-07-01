<?php

namespace App\Policies;

use App\Models\Member\Member;
use Illuminate\Auth\Access\HandlesAuthorization;

class NotificationPolicy {
    use HandlesAuthorization;

    public function register(Member $member): bool {
        return $member->isMemberOrMore();
    }

    public function edit(Member $member): bool {
        return $member->isMemberOrMore();
    }

    public function delete(Member $member): bool {
        return $member->isMemberOrMore();
    }

    public function notifications(Member $member): bool {
        return $member->isMemberOrMore();
    }

    public function notification(Member $member): bool {
        return $member->isMemberOrMore();
    }
}
