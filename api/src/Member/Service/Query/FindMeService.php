<?php

namespace MakeIT\Member\Service\Query;

use MakeIT\Member\Domain\Bean\MemberBean;
use MakeIT\Member\Repository\Interface\MemberRepository;

class FindMeService
{
    private MemberRepository $memberRepo;

    public function __construct(MemberRepository $memberRepo)
    {
        $this->memberRepo = $memberRepo;
    }

    public function execute(): MemberBean
    {
        return $this->memberRepo->findOneByMemberId(auth()->id());
    }
}
