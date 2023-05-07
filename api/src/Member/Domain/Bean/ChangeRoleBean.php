<?php

namespace MakeIT\Member\Domain\Bean;

class ChangeRoleBean
{
    private int $memberId;
    private int $roleId;
    private int $version;

    private function __construct(int $memberId, int $roleId, int $version)
    {
        $this->memberId = $memberId;
        $this->roleId   = $roleId;
        $this->version  = $version;
    }

    public function getMemberId(): int
    {
        return $this->memberId;
    }

    public function getRoleId(): int
    {
        return $this->roleId;
    }

    public function getVersion(): int
    {
        return $this->version;
    }

    public static function from(int $memberId, int $roleId, int $version): self
    {
        return new self(
            $memberId,
            $roleId,
            $version,
        );
    }
}
