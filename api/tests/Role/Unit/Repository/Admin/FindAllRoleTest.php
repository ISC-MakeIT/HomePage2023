<?php

namespace Tests\Role\Unit\Repository\Admin;

use MakeIT\Role\Domain\Entity\Admin\RoleName;

class FindAllRoleTest extends Base
{
    public function testロールの一覧取得を行えること(): void
    {
        $roleList = $this->roleRepo->findAll();
        $this->assertCount(count($roleList), RoleName::cases());
    }
}
