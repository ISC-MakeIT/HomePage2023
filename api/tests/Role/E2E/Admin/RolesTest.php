<?php

namespace Tests\Role\E2E\Admin;

use App\Http\Response\Member\Admin\RolesResponse;
use MakeIT\Role\Repository\Admin\DummyRoleRepository;
use MakeIT\Role\Service\Query\Admin\RolesService;
use Tests\AlreadyLoggedInTestCase;

class RolesTest extends AlreadyLoggedInTestCase
{
    private RolesService $rolesService;

    protected function setUp(): void
    {
        parent::setUp();

        $this->rolesService = new RolesService(new DummyRoleRepository());
    }

    public function testロールの一覧取得を行うこと(): void
    {
        $response = $this->get('/api/admin/roles');
        $response->assertJson(
            RolesResponse::success($this->rolesService->execute())->toArray()
        );
    }
}
