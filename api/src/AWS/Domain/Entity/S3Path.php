<?php

namespace MakeIT\AWS\Domain\Entity;

enum S3Path: string
{
    case WORK             = 'image/imagesForWork';
    case WORK_THUMBNAIL   = 'image/imagesForWork/thumbnail';

    case MEMBER           = 'image/icons';
    case MEMBER_THUMBNAIL = 'image/icons/thumbnail';

    case OGP              = 'image/ogpImages';
    case OGP_THUMBNAIL    = 'image/ogpThumbnails';

    public function toString()
    {
        return $this->value;
    }
}
