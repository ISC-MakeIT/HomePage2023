<?php

namespace MakeIT\Member\Service\Command\Admin;

use MakeIT\Member\Domain\Bean\Admin\LatestMember;
use MakeIT\Member\Domain\Bean\Admin\LatestMemberBean;
use MakeIT\Member\Repository\Admin\Interface\MemberRepository;
use MakeIT\Member\Domain\Bean\Admin\MemberBean;
use MakeIT\Member\Domain\Entity\Admin\MemberConstant;
use MakeIT\Member\Exception\AlreadyEditedMemberException;

class EditMemberService
{
    private MemberRepository $memberRepo;

    public function __construct(
        MemberRepository $memberRepo,
    ) {
        $this->memberRepo  = $memberRepo;
    }

    public function execute(LatestMemberBean $latestMemberBean): MemberBean
    {
        $latestMember = LatestMember::fromBean($latestMemberBean);

        $member = $this->memberRepo->findOneByMemberId(auth()->id());
        if ($latestMember->isDifferentVersion($member->getVersion())) {
            throw new AlreadyEditedMemberException();
        }

        $editedMember = $this->memberRepo->save($member->overwrite(
            name: $latestMember->getName(),
            jobTitle: $latestMember->getJobTitle(),
            discord: $latestMember->getDiscord() ?? MemberConstant::MEMBER_SNS_DEFAULT_VALUE,
            twitter: $latestMember->getTwitter() ?? MemberConstant::MEMBER_SNS_DEFAULT_VALUE,
            github: $latestMember->getGithub()   ?? MemberConstant::MEMBER_SNS_DEFAULT_VALUE,
            description: $latestMember->getDiscord(),
            isActive: $latestMember->getIsActive(),
        ));

        return $editedMember;
    }
}
