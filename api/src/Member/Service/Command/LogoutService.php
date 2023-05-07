<?php

namespace MakeIT\Member\Service\Command;

use MakeIT\Member\Repository\Interface\MemberRepository;

class LogoutService
{
    private MemberRepository $memberRepo;

    public function __construct(MemberRepository $memberRepo)
    {
        $this->memberRepo = $memberRepo;
    }

    public function execute(string $token): void
    {
        $this->memberRepo->deleteToken(auth()->id(), $token);
    }
}
