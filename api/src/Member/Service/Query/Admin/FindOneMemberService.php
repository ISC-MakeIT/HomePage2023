<?php

namespace MakeIT\Member\Service\Query\Admin;

use MakeIT\Member\Domain\Bean\Admin\MemberBean;
use MakeIT\Member\Repository\Admin\Interface\MemberRepository;

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
