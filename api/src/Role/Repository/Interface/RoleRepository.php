<?php

namespace MakeIT\Role\Repository\Interface;

use MakeIT\Role\Domain\Bean\Role;

interface RoleRepository
{
    /** @return array<Role> */
    public function findAll(): array;

    public function findOneByRoleId(int $roleId): Role;
}
