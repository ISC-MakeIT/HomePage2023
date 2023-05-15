<?php

namespace MakeIT\Role\Service\Query\Admin;

use Illuminate\Database\Eloquent\ModelNotFoundException;
use MakeIT\Role\Domain\Bean\Admin\RoleBean;
use MakeIT\Role\Domain\Entity\Admin\RoleList;
use MakeIT\Role\Repository\Admin\Interface\RoleRepository;

class RolesService
{
    private RoleRepository $roleRepo;

    public function __construct(RoleRepository $roleRepo)
    {
        $this->roleRepo = $roleRepo;
    }

    /** @return array<RoleBean> */
    public function execute(): array
    {
        $roleList = $this->roleRepo->findAll();

        if (RoleList::fromBean($roleList)->isEmpty()) {
            throw new ModelNotFoundException('ロールのリストが存在しません。');
        }

        return $roleList;
    }
}
