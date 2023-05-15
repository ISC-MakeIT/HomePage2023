<?php

namespace MakeIT\Role\Repository\Admin\Interface;

use MakeIT\Role\Domain\Bean\Admin\RoleBean;

interface RoleRepository
{
    /** @return array<Role> */
    public function findAll(): array;

    public function findOneByRoleId(int $roleId): RoleBean;
}
