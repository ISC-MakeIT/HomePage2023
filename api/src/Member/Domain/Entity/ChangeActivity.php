<?php

namespace MakeIT\Member\Domain\Entity;

use MakeIT\Member\Domain\Bean\ChangeActivityBean;

class ChangeActivity
{
    private int $memberId;
    private bool $isActive;
    private int $version;

    private function __construct(int $memberId, bool $isActive, int $version)
    {
        $this->memberId = $memberId;
        $this->isActive = $isActive;
        $this->version  = $version;
    }

    public function getMemberId(): int
    {
        return $this->memberId;
    }

    public function getIsActive(): bool
    {
        return $this->isActive;
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

    public static function fromBean(ChangeActivityBean $changeActivityBean): self
    {
        return new self(
            $changeActivityBean->getMemberId(),
            $changeActivityBean->getIsActive(),
            $changeActivityBean->getVersion(),
        );
    }
}
