<?php

namespace MakeIT\Role\Repository\Admin;

use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Collection;
use MakeIT\Role\Domain\Bean\Admin\RoleBean;
use MakeIT\Role\Domain\Entity\Admin\RoleName;

class DummyRoleRepository implements \MakeIT\Role\Repository\Admin\Interface\RoleRepository
{
    /** @return array<RoleBean> */
    public function findAll(): array
    {
        return collect(RoleName::cases())
            ->map(
                fn (RoleName $roleName, int $index) =>
                RoleBean::from($index + 1, $roleName->toString())
            )
            ->toArray();
    }

    public function findOneByRoleId(int $roleId): RoleBean
    {
        /** @var Collection */
        $collection = collect(RoleName::cases())
            ->map(
                fn (RoleName $roleName, int $index) =>
                RoleBean::from($index + 1, $roleName->toString())
            );

        if (!$collection->has($roleId)) {
            throw new ModelNotFoundException('存在しないロールです。');
        }

        return $collection->get($roleId);
    }
}
