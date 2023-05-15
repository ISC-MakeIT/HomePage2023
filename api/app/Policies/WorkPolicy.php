<?php

namespace App\Policies;

use MakeIT\Member\Domain\Eloquent\Member as MemberORM;
use Illuminate\Auth\Access\HandlesAuthorization;

class WorkPolicy
{
    use HandlesAuthorization;

    public function register(MemberORM $member): bool
    {
        return $member->isMemberOrMore();
    }

    public function edit(MemberORM $member): bool
    {
        return $member->isMemberOrMore();
    }

    public function delete(MemberORM $member): bool
    {
        return $member->isMemberOrMore();
    }

    public function works(MemberORM $member): bool
    {
        return $member->isMemberOrMore();
    }

    public function work(MemberORM $member): bool
    {
        return $member->isMemberOrMore();
    }
}
