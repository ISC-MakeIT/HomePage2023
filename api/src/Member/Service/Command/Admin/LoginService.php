<?php

namespace MakeIT\Member\Service\Command\Admin;

use MakeIT\Member\Domain\Bean\Admin\CredentialBean;
use MakeIT\Member\Domain\Bean\Admin\MemberWithTokenBean;
use MakeIT\Member\Repository\Admin\Interface\MemberRepository;

class LoginService
{
    private MemberRepository $memberRepo;

    public function __construct(MemberRepository $memberRepo)
    {
        $this->memberRepo = $memberRepo;
    }

    public function execute(CredentialBean $credential): MemberWithTokenBean
    {
        $member = $this->memberRepo->findOneByCredential($credential);

        return MemberWithTokenBean::from(
            $this->memberRepo->createTokenByMemberId($member->getMemberId()),
            $member,
        );
    }
}
