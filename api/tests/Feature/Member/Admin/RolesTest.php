<?php

namespace Tests\Feature\Member\Admin;

use App\Http\Response\Member\Admin\RolesResponse;
use Tests\Feature\AlreadyLoggedInTestCase;

class RolesTest extends AlreadyLoggedInTestCase
{
    public function test_ロールの取得を行えること(): void
    {
        $response = $this->get('/api/admin/members/roles');
        $response->assertOk();
        $response->assertJson(
            RolesResponse::success($this->roleRepo->findAll())
        );
    }
}
