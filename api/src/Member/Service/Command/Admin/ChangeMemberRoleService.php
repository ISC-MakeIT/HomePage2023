<?php

namespace MakeIT\Member\Service\Command\Admin;

use MakeIT\Member\Domain\Bean\Admin\MemberBean;
use MakeIT\Member\Domain\Bean\Admin\ChangeRoleBean;
use MakeIT\Member\Domain\Entity\Admin\ChangeRole;
use MakeIT\Member\Exception\AlreadyEditedMemberException;
use MakeIT\Member\Exception\IllegalChangeMyRoleException;
use MakeIT\Member\Repository\Admin\Interface\MemberRepository;
use MakeIT\Role\Domain\Bean\Admin\RoleBean;
use MakeIT\Role\Repository\Admin\Interface\RoleRepository;

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
            throw new IllegalChangeMyRoleException();
        }

        $preMember = $this->memberRepo->findOneByMemberId($changeRole->getMemberId());
        if ($changeRole->isDifferentVersion($preMember->getVersion())) {
            throw new AlreadyEditedMemberException();
        }

        $role = $this->roleRepo->findOneByRoleId($preMember->getRole()->getRoleId());

        $member = $preMember->overwrite(role: RoleBean::from(
            $role->getRoleId(),
            $role->getName(),
        ));
        $this->memberRepo->save($member);

        return $member;
    }
}
