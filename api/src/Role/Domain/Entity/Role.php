<?php

namespace MakeIT\Role\Domain\Entity;

use MakeIT\Role\Domain\Bean\Role as RoleBean;

class Role
{
    private int $roleId;
    private RoleName $name;

    private function __construct(int $roleId, RoleName $name)
    {
        $this->roleId = $roleId;
        $this->name   = $name;
    }

    public function getRoleId(): int
    {
        return $this->roleId;
    }

    public function getName(): RoleName
    {
        return $this->name;
    }

    public static function fromBean(RoleBean $roleBean): self
    {
        return new self(
            $roleBean->getRoleId(),
            RoleName::from($roleBean->getName()),
        );
    }
}
