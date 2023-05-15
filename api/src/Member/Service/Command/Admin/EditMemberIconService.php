<?php

namespace MakeIT\Member\Service\Command\Admin;

use MakeIT\AWS\Domain\Bean\PutImageBean;
use MakeIT\AWS\Repository\Interface\S3ImageRepository;
use MakeIT\Member\Domain\Bean\Admin\LatestMemberIcon;
use MakeIT\Member\Domain\Bean\Admin\LatestMemberIconBean;
use MakeIT\Member\Repository\Admin\Interface\MemberRepository;
use MakeIT\Member\Domain\Bean\Admin\MemberBean;
use MakeIT\Member\Exception\AlreadyEditedMemberException;
use Intervention\Image\Facades\Image as InterventionImage;
use MakeIT\AWS\Domain\Entity\S3Path;

class EditMemberIconService
{
    private MemberRepository $memberRepo;
    private S3ImageRepository $s3ImageRepo;

    public function __construct(
        MemberRepository $memberRepo,
        S3ImageRepository $s3ImageRepo,
    ) {
        $this->memberRepo  = $memberRepo;
        $this->s3ImageRepo = $s3ImageRepo;
    }

    public function execute(LatestMemberIconBean $latestMemberIconBean): MemberBean
    {
        $latestMemberIcon = LatestMemberIcon::fromBean($latestMemberIconBean);

        $member = $this->memberRepo->findMe();
        if ($latestMemberIcon->isDifferentVersion($member->getVersion())) {
            throw new AlreadyEditedMemberException();
        }

        $s3ImageBean = $this->s3ImageRepo->putImage(PutImageBean::from(
            InterventionImage::make($latestMemberIconBean->getIcon()),
            S3Path::MEMBER,
            S3Path::MEMBER_THUMBNAIL,
            80,
            20,
        ));

        $editedMember = $this->memberRepo->save($member->overwrite(
            thumbnail: $s3ImageBean->getThumbnailUrl()
        ));

        return $editedMember;
    }
}
