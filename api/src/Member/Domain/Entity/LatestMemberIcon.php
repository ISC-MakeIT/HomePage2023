<?php

namespace MakeIT\Member\Domain\Bean;

use Illuminate\Http\UploadedFile;

class LatestMemberIcon
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

    public function isSameVersion(int $anotherVersion): bool
    {
        return $this->getVersion() === $anotherVersion;
    }

    public function isDifferentVersion(int $anotherVersion): bool
    {
        return !$this->isSameVersion($anotherVersion);
    }

    public static function fromBean(LatestMemberIconBean $latestMemberIconBean): self
    {
        return new self(
            $latestMemberIconBean->getIcon(),
            $latestMemberIconBean->getVersion(),
        );
    }
}
