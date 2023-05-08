<?php

namespace MakeIT\Member\Service\Query;

use MakeIT\Member\Domain\Bean\MemberBean;
use MakeIT\Member\Repository\Interface\MemberRepository;

class FindAllMemberService
{
    private MemberRepository $memberRepo;

    public function __construct(MemberRepository $memberRepo)
    {
        $this->memberRepo = $memberRepo;
    }

    /** @return array<MemberBean> */
    public function execute(): array
    {
        return $this->memberRepo->findAll();
    }
}
