<?php

namespace Tests\Role\Unit\Repository\Admin;

use Illuminate\Database\Eloquent\ModelNotFoundException;
use MakeIT\Role\Domain\Entity\Admin\RoleName;

class FindOneByRoleIdTest extends Base
{
    public function testロールの単体取得を行えること(): void
    {
        $roleList = $this->roleRepo->findAll();
        $this->assertCount(count($roleList), RoleName::cases());

        $forConfirmRole = $roleList[0];
        $role           = $this->roleRepo->findOneByRoleId($forConfirmRole->getRoleId());
        $this->assertEquals($forConfirmRole, $role);
    }

    public function testロールが存在しなかった場合Exceptionが発生すること(): void
    {
        $roleList = $this->roleRepo->findAll();
        $this->assertCount(count($roleList), RoleName::cases());

        $this->expectException(ModelNotFoundException::class);
        $this->roleRepo->findOneByRoleId(10000);
    }
}
