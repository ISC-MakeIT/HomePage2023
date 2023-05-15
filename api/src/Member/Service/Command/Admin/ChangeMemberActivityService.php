<?php

namespace MakeIT\Member\Service\Command\Admin;

use MakeIT\Member\Domain\Bean\Admin\ChangeActivityBean;
use MakeIT\Member\Domain\Bean\Admin\MemberBean;
use MakeIT\Member\Domain\Entity\Admin\ChangeActivity;
use MakeIT\Member\Exception\AlreadyEditedMemberException;
use MakeIT\Member\Repository\Admin\Interface\MemberRepository;

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
            throw new AlreadyEditedMemberException();
        }

        $member = $preMember->overwrite(isActive: $changeActivity->getIsActive());
        $this->memberRepo->save($member);

        return $member;
    }
}
