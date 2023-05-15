<?php

namespace MakeIT\Member\Service\Command\Admin;

use MakeIT\Member\Repository\Admin\Interface\MemberRepository;

class DeleteMemberService
{
    private MemberRepository $memberRepo;

    public function __construct(MemberRepository $memberRepo)
    {
        $this->memberRepo  = $memberRepo;
    }

    public function execute(int $memberId): void
    {
        $this->memberRepo->deleteByMemberId($memberId);
    }
}
