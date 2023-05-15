<?php

namespace MakeIT\Member\Domain\Entity\Admin;

use MakeIT\Member\Domain\Bean\Admin\ChangeRoleBean;

class ChangeRole
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

    public function isSameMemberId(int $anotherId): bool
    {
        return $this->getMemberId() === $anotherId;
    }

    public function isSameVersion(int $anotherVersion): bool
    {
        return $this->getVersion() === $anotherVersion;
    }

    public function isDifferentVersion(int $anotherVersion): bool
    {
        return !$this->isSameVersion($anotherVersion);
    }

    public static function fromBean(ChangeRoleBean $changeRoleBean): self
    {
        return new self(
            $changeRoleBean->getMemberId(),
            $changeRoleBean->getRoleId(),
            $changeRoleBean->getVersion(),
        );
    }
}
