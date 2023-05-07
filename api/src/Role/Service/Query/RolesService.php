<?php

namespace MakeIT\Role\Service\Query;

use Illuminate\Database\Eloquent\ModelNotFoundException;
use MakeIT\Role\Domain\Bean\Role;
use MakeIT\Role\Domain\Entity\RoleList;
use MakeIT\Role\Repository\Interface\RoleRepository;

class RolesService
{
    private RoleRepository $roleRepo;

    public function __construct(RoleRepository $roleRepo)
    {
        $this->roleRepo = $roleRepo;
    }

    /** @return array<Role> */
    public function execute(): array
    {
        $roleList = $this->roleRepo->findAll();

        if (RoleList::fromBean($roleList)->isEmpty()) {
            throw new ModelNotFoundException('ロールのリストが存在しません。');
        }

        return $roleList;
    }
}
