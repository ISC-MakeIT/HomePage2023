<?php

namespace MakeIT\Member\Service\Command;

use Illuminate\Database\Eloquent\ModelNotFoundException;
use MakeIT\Member\Domain\Bean\ChangeActivityBean;
use MakeIT\Member\Domain\Bean\MemberBean;
use MakeIT\Member\Domain\Entity\ChangeActivity;
use MakeIT\Member\Exception\AlreadyEditMemberException;
use MakeIT\Member\Repository\Interface\MemberRepository;

class ChangeMemberActivityService
{
    private MemberRepository $memberRepo;

    public function __construct(MemberRepository $memberRepo)
    {
        $this->memberRepo = $memberRepo;
    }

    public function execute(ChangeActivityBean $changeActivityBean): MemberBean
    {
        $changeActivity = ChangeActivity::fromBean($changeActivityBean);

        $preMember = $this->memberRepo->findOneByMemberId($changeActivity->getMemberId());

        if ($changeActivity->isDifferentVersion($preMember->getVersion())) {
            throw new AlreadyEditMemberException();
        }

        $member = $preMember->overwrite(isActive: $changeActivity->getIsActive());
        $this->memberRepo->save($member);

        return $member;
    }
}
