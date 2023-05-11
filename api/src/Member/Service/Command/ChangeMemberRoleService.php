<?php

namespace MakeIT\Member\Service\Command;

use MakeIT\Member\Domain\Bean\MemberBean;
use MakeIT\Member\Domain\Bean\ChangeRoleBean;
use MakeIT\Member\Domain\Entity\ChangeRole;
use MakeIT\Member\Exception\AlreadyEditMemberException;
use MakeIT\Member\Exception\IllegalChangeMyRole;
use MakeIT\Member\Repository\Interface\MemberRepository;
use MakeIT\Role\Domain\Bean\Role;
use MakeIT\Role\Repository\Interface\RoleRepository;

class ChangeMemberRoleService
{
    private MemberRepository $memberRepo;
    private RoleRepository $roleRepo;

    public function __construct(
        MemberRepository $memberRepo,
        RoleRepository $roleRepo,
    ) {
        $this->memberRepo = $memberRepo;
        $this->roleRepo   = $roleRepo;
    }

    public function execute(ChangeRoleBean $changeRoleBean): MemberBean
    {
        $changeRole = ChangeRole::fromBean($changeRoleBean);

        $me = $this->memberRepo->findMe();
        if ($changeRole->isSameMemberId($me->getMemberId())) {
            throw new IllegalChangeMyRole();
        }

        $preMember = $this->memberRepo->findOneByMemberId($changeRole->getMemberId());
        if ($changeRole->isDifferentVersion($preMember->getVersion())) {
            throw new AlreadyEditMemberException();
        }

        $role = $this->roleRepo->findOneByRoleId($preMember->getRole()->getRoleId());

        $member = $preMember->overwrite(role: Role::from(
            $role->getRoleId(),
            $role->getName(),
        ));
        $this->memberRepo->save($member);

        return $member;
    }
}
