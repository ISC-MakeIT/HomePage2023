<?php

namespace MakeIT\Role\Repository;

use MakeIT\Role\Domain\Bean\Role;
use MakeIT\Role\Domain\Eloquent\Role as RoleORM;

class RoleRepository implements \MakeIT\Role\Repository\Interface\RoleRepository
{
    /** @return array<Role> */
    public function findAll(): array
    {
        return RoleORM::all()
            ->map(
                fn (RoleORM $role) =>
                    Role::from($role->getRoleId(), $role->getName())
            )
            ->toArray();
    }

    public function findOneByRoleId(int $roleId): Role
    {
        /** @var RoleORM */
        $roleORM = RoleORM::find($roleId);

        return Role::from($roleORM->getRoleId(), $roleORM->getName());
    }
}
