<?php

namespace MakeIT\Member\Domain\Bean;

use Illuminate\Http\UploadedFile;

class LatestMemberIconBean
{
    private UploadedFile $icon;
    private int $version;

    private function __construct(UploadedFile $icon, int $version)
    {
        $this->icon = $icon;
        $this->version = $version;
    }

    public function getIcon(): UploadedFile
    {
        return $this->icon;
    }

    public function getVersion(): int
    {
        return $this->version;
    }

    public static function from(UploadedFile $icon, int $version): self
    {
        return new self($icon,$version);
    }
}
