<?php

namespace App\Domain\ValueObjects\Helpers;

enum S3Path: string {
    case WORK_THUMBNAIL   = 'image/imagesForWork/thumbnail';
    case MEMBER_THUMBNAIL = 'image/icons/thumbnail';

    public function toString() {
        return $this->value;
    }
}
