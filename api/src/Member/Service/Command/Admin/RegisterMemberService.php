<?php

namespace MakeIT\Member\Service\Command\Admin;

use Illuminate\Support\Facades\Hash;
use MakeIT\AWS\Domain\Bean\PutImageBean;
use MakeIT\AWS\Domain\Entity\S3Path;
use MakeIT\AWS\Repository\Interface\S3ImageRepository;
use MakeIT\Member\Domain\Bean\Admin\InitMemberBean;
use MakeIT\Member\Repository\Admin\Interface\MemberRepository;
use Intervention\Image\Facades\Image as InterventionImage;
use MakeIT\Member\Domain\Bean\Admin\MemberBean;
use MakeIT\Member\Domain\Entity\Admin\MemberConstant;
use MakeIT\Role\Domain\Bean\Admin\RoleBean;
use MakeIT\Role\Repository\Admin\Interface\RoleRepository;

class RegisterMemberService
{
    private MemberRepository $memberRepo;
    private RoleRepository $roleRepo;
    private S3ImageRepository $s3ImageRepo;

    public function __construct(
        MemberRepository $memberRepo,
        RoleRepository $roleRepo,
        S3ImageRepository $s3ImageRepo
    ) {
        $this->memberRepo  = $memberRepo;
        $this->roleRepo    = $roleRepo;
        $this->s3ImageRepo = $s3ImageRepo;
    }

    public function execute(InitMemberBean $initMemberBean): MemberBean
    {
        $s3ImageBean = $this->s3ImageRepo->putImage(PutImageBean::from(
            InterventionImage::make($initMemberBean->getIcon()),
            S3Path::MEMBER,
            S3Path::MEMBER_THUMBNAIL,
            80,
            20,
        ));

        $role = $this->roleRepo->findOneByRoleId($initMemberBean->getRoleId());

        $registerdMember = $this->memberRepo->save(MemberBean::from(
            MemberConstant::MEMBER_ID_DEFAULT_VALUE,
            $initMemberBean->getName(),
            $initMemberBean->getJobTitle(),
            $initMemberBean->getDiscord() ?? MemberConstant::MEMBER_SNS_DEFAULT_VALUE,
            $initMemberBean->getTwitter() ?? MemberConstant::MEMBER_SNS_DEFAULT_VALUE,
            $initMemberBean->getGithub()  ?? MemberConstant::MEMBER_SNS_DEFAULT_VALUE,
            $initMemberBean->getDescription(),
            $s3ImageBean->getThumbnailUrl(),
            $initMemberBean->getUsername(),
            Hash::make($initMemberBean->getPassword()),
            MemberConstant::MEMBER_VERSION_DEFAULT_VALUE,
            MemberConstant::MEMBER_ACTIVITY_DEFAULT_VALUE,
            RoleBean::from(
                $role->getRoleId(),
                $role->getName(),
            ),
            auth()->id(),
            auth()->id(),
        ));

        return $registerdMember;
    }
}
