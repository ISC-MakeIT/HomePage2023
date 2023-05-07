<?php

namespace Tests\Feature\Member\Admin;

use App\Http\Resources\Member\Admin\RolesResource;
use App\Models\Member\Role;
use Illuminate\Http\Request;
use Tests\Feature\AlreadyLoggedInTestCase;

class RolesTest extends AlreadyLoggedInTestCase
{
    public function test_ロールの取得を行えること(): void
    {
        $response = $this->get('/api/admin/members/roles');
        $response->assertOk();
        $response->assertJson(
            RolesResource::collection(Role::all())
                ->toArray(new Request())
        );
    }
}
