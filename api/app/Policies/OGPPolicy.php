<?php

namespace App\Policies;

use App\Models\Member\Member;
use Illuminate\Auth\Access\HandlesAuthorization;

class OGPPolicy {
    use HandlesAuthorization;

    public function OGPList(Member $member) {
        return $member->isMemberOrMore();
    }

    public function registerOGP(Member $member) {
        return $member->isMemberOrMore();
    }

    public function editOGP(Member $member) {
        return $member->isMemberOrMore();
    }

    public function deleteOGP(Member $member) {
        return $member->isMemberOrMore();
    }

    public function OGP(Member $member) {
        return $member->isMemberOrMore();
    }
}
