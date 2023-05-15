<?php

namespace MakeIT\Member\Service\Command\Admin;

use Illuminate\Support\Facades\Hash;
use MakeIT\Member\Domain\Bean\Admin\ChangePasswordBean;
use MakeIT\Member\Domain\Bean\Admin\MemberBean;
use MakeIT\Member\Domain\Entity\Admin\ChangePassword;
use MakeIT\Member\Exception\IllegalPasswordDifferentException;
use MakeIT\Member\Repository\Admin\Interface\MemberRepository;

class ChangeMemberPasswordService
{
    private MemberRepository $memberRepo;

    public function __construct(MemberRepository $memberRepo)
    {
        $this->memberRepo = $memberRepo;
    }

    public function execute(ChangePasswordBean $changePasswordBean): MemberBean
    {
        $changePassword = ChangePassword::fromBean($changePasswordBean);

        $preMember = $this->memberRepo->findMe();
        if ($changePassword->isDifferentOldPassword($preMember->getHashedPassword())) {
            throw new IllegalPasswordDifferentException();
        }

        $member = $preMember->overwrite(password: Hash::make($changePassword->getNewPassword()));
        $this->memberRepo->save($member);

        return $member;
    }
}
