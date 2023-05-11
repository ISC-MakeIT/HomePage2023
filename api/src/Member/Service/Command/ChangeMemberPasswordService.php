<?php

namespace MakeIT\Member\Service\Command;

use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\Hash;
use MakeIT\Member\Domain\Bean\ChangePasswordBean;
use MakeIT\Member\Domain\Bean\MemberBean;
use MakeIT\Member\Domain\Entity\ChangePassword;
use MakeIT\Member\Exception\IllegalPasswordDifferentException;
use MakeIT\Member\Repository\Interface\MemberRepository;

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

        $preMember = $this->memberRepo->findOneByMemberId(auth()->id());

        if ($changePassword->isDifferentOldPassword($preMember->getHashedPassword())) {
            throw new IllegalPasswordDifferentException();
        }

        $member = $preMember->overwrite(password: Hash::make($changePassword->getNewPassword()));
        $this->memberRepo->save($member);

        return $member;
    }
}
