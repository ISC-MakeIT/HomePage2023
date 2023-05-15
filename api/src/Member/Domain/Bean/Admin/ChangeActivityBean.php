<?php

namespace MakeIT\Member\Domain\Bean\Admin;

class ChangeActivityBean
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

    public static function from(int $memberId, bool $isActive, int $version): self
    {
        return new self(
            $memberId,
            $isActive,
            $version,
        );
    }
}
