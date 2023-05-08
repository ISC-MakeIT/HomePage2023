<?php

namespace MakeIT\Member\Service\Query;

use MakeIT\Member\Domain\Bean\MemberBean;
use MakeIT\Member\Repository\Interface\MemberRepository;

class FindOneMemberService
{
    private MemberRepository $memberRepo;

    public function __construct(MemberRepository $memberRepo)
    {
        $this->memberRepo = $memberRepo;
    }

    public function execute(int $memberId): MemberBean
    {
        return $this->memberRepo->findOneByMemberId($memberId);
    }
}
