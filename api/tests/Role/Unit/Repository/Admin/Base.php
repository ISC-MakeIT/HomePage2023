<?php

namespace Tests\Role\Unit\Repository\Admin;

use MakeIT\Role\Repository\Admin\RoleRepository;
use Tests\BaseTestCase;

class Base extends BaseTestCase
{
    protected RoleRepository $roleRepo;

    protected function setUp(): void
    {
        parent::setUp();

        $this->roleRepo = new RoleRepository();
    }
}
