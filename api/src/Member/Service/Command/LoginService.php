<?php

namespace MakeIT\Member\Service\Command;

use MakeIT\Member\Domain\Bean\CredentialBean;
use MakeIT\Member\Domain\Bean\MemberWithTokenBean;
use MakeIT\Member\Repository\Interface\MemberRepository;
use Symfony\Component\HttpKernel\Exception\UnauthorizedHttpException;

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
        if ($member) {
            return MemberWithTokenBean::from(
                $this->memberRepo->createTokenByMemberId($member->getMemberId()),
                $member,
            );
        }

        throw new UnauthorizedHttpException('ユーザー名かパスワードが違います。');
    }
}
