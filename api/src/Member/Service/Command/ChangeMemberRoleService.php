<?php

namespace MakeIT\Member\Service\Command;

use Illuminate\Database\Eloquent\ModelNotFoundException;
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

        if ($changeRole->isSameMemberId(auth()->id())) {
            throw new IllegalChangeMyRole();
        }

        $preMember = $this->memberRepo->findOneByMemberId($changeRole->getMemberId());
        if (!$preMember) {
            throw new ModelNotFoundException('存在しないメンバーです。');
        }

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
