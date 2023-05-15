<?php

namespace App\Policies;

use MakeIT\Member\Domain\Eloquent\Member as MemberORM;
use Illuminate\Auth\Access\HandlesAuthorization;

class OGPPolicy
{
    use HandlesAuthorization;

    public function OGPList(MemberORM $member)
    {
        return $member->isMemberOrMore();
    }

    public function registerOGP(MemberORM $member)
    {
        return $member->isMemberOrMore();
    }

    public function editOGP(MemberORM $member)
    {
        return $member->isMemberOrMore();
    }

    public function deleteOGP(MemberORM $member)
    {
        return $member->isMemberOrMore();
    }

    public function OGP(MemberORM $member)
    {
        return $member->isMemberOrMore();
    }
}
