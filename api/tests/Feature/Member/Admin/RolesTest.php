<?php

namespace Tests\Feature\Member\Admin;

use App\Models\Member\Role;
use Tests\Feature\AlreadyLoggedInTestCase;

class RolesTest extends AlreadyLoggedInTestCase {
    public function test_ロールの取得を行えること(): void {
        $response = $this->get('/api/admin/members/roles');
        $response->assertOk();
        $response->assertJson([
            'roles' => Role::all()->map(function ($role) {
                return $role->toLowerCamelCaseJson();
            })->toArray()
        ]);
    }
}
