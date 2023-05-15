<?php

namespace MakeIT\Role\Repository\Admin;

use Illuminate\Database\Eloquent\ModelNotFoundException;
use MakeIT\Role\Domain\Bean\Admin\RoleBean;
use MakeIT\Role\Domain\Eloquent\Role as RoleORM;

class RoleRepository implements \MakeIT\Role\Repository\Admin\Interface\RoleRepository
{
    /** @return array<Role> */
    public function findAll(): array
    {
        return RoleORM::all()
            ->map(
                fn (RoleORM $role) =>
                RoleBean::from($role->getRoleId(), $role->getName())
            )
            ->toArray();
    }

    public function findOneByRoleId(int $roleId): RoleBean
    {
        /** @var ?RoleORM */
        $roleORM = RoleORM::find($roleId);

        if (!$roleORM) {
            throw new ModelNotFoundException('存在しないロールです。');
        }

        return RoleBean::from($roleORM->getRoleId(), $roleORM->getName());
    }
}
