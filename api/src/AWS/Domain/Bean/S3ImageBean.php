<?php

namespace MakeIT\AWS\Domain\Bean;

class S3ImageBean
{
    private string $imageUrl;
    private string $thumbnailUrl;

    public function __construct(
        string $imageUrl,
        string $thumbnailUrl
    ) {
        $this->imageUrl     = $imageUrl;
        $this->thumbnailUrl = $thumbnailUrl;
    }

    public function getImageUrl(): string
    {
        return $this->imageUrl;
    }

    public function getThumbnailUrl(): string
    {
        return $this->thumbnailUrl;
    }

    public static function from(
        string $imageUrl,
        string $thumbnailUrl
    ): self {
        return new self(
            $imageUrl,
            $thumbnailUrl,
        );
    }
}
