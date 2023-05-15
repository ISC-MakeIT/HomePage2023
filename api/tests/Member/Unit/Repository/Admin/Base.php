<?php

namespace Tests\Member\Unit\Repository\Admin;

use MakeIT\Member\Repository\Admin\MemberRepository;
use MakeIT\Role\Repository\Admin\RoleRepository;
use Tests\BaseTestCase;

class Base extends BaseTestCase
{
    protected MemberRepository $memberRepo;
    protected RoleRepository $roleRepo;

    protected function setUp(): void
    {
        parent::setUp();

        $this->memberRepo = new MemberRepository();
        $this->roleRepo   = new RoleRepository();
    }
}
