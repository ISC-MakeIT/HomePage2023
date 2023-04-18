<?php

namespace App\Domain\ValueObjects\Helpers;

enum S3Path: string {
    case WORK_THUMBNAIL   = 'image/imagesForWork/thumbnail';
    case MEMBER_THUMBNAIL = 'image/icons/thumbnail';
    case OGP_THUMBNAIL = 'image/ogpThumbnails';

    public function toString() {
        return $this->value;
    }
}
