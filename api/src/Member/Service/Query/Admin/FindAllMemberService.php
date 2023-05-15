<?php

namespace MakeIT\Member\Service\Query\Admin;

use MakeIT\Member\Domain\Bean\Admin\MemberBean;
use MakeIT\Member\Repository\Admin\Interface\MemberRepository;

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
