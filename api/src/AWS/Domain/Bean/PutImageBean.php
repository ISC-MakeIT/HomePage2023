<?php

namespace MakeIT\AWS\Domain\Bean;

use Intervention\Image\Image;
use MakeIT\AWS\Domain\Entity\S3Path;

class PutImageBean
{
    private Image $image;
    private S3Path $imagePath;
    private S3Path $thumbnailPath;
    private int $quality;
    private int $thumbnailQuality;

    private function __construct(
        Image $image,
        S3Path $imagePath,
        S3Path $thumbnailPath,
        int $quality,
        int $thumbnailQuality,
    ) {
        $this->image            = $image;
        $this->imagePath        = $imagePath;
        $this->thumbnailPath    = $thumbnailPath;
        $this->quality          = $quality;
        $this->thumbnailQuality = $thumbnailQuality;
    }

    public function getImage(): Image
    {
        return $this->image;
    }

    public function getImagePath(): S3Path
    {
        return $this->imagePath;
    }

    public function getThumbnailPath(): S3Path
    {
        return $this->thumbnailPath;
    }

    public function getQuality(): int
    {
        return $this->quality;
    }

    public function getThumbnailQuality(): int
    {
        return $this->thumbnailQuality;
    }

    public static function from(
        Image $image,
        S3Path $imagePath,
        S3Path $thumbnailPath,
        int $quality,
        int $thumbnailQuality,
    ): self {
        return new self(
            $image,
            $imagePath,
            $thumbnailPath,
            $quality,
            $thumbnailQuality,
        );
    }
}
