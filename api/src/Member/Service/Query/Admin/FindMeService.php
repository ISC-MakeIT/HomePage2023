<?php

namespace MakeIT\Member\Service\Query\Admin;

use MakeIT\Member\Domain\Bean\Admin\MemberBean;
use MakeIT\Member\Repository\Admin\Interface\MemberRepository;

class FindMeService
{
    private MemberRepository $memberRepo;

    public function __construct(MemberRepository $memberRepo)
    {
        $this->memberRepo = $memberRepo;
    }

    public function execute(): MemberBean
    {
        return $this->memberRepo->findMe();
    }
}
