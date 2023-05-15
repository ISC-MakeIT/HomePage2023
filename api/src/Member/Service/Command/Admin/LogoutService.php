<?php

namespace MakeIT\Member\Service\Command\Admin;

use MakeIT\Member\Repository\Admin\Interface\MemberRepository;

class LogoutService
{
    private MemberRepository $memberRepo;

    public function __construct(MemberRepository $memberRepo)
    {
        $this->memberRepo = $memberRepo;
    }

    public function execute(string $token): void
    {
        $me = $this->memberRepo->findMe();

        $this->memberRepo->deleteToken($me->getMemberId(), $token);
    }
}
