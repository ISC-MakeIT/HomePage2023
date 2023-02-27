<?php

namespace Tests\Feature\Member\Admin;

use App\Http\Requests\Member\Admin\ChangePasswordRequest;
use App\Models\Member\ActiveMember;
use Illuminate\Support\Facades\Hash;
use Tests\Feature\AlreadyLoggedInTestCase;

class ChangeMemberPasswordTest extends AlreadyLoggedInTestCase {
    public function test_パスワードの変更を行えること(): void {
        $request = new ChangePasswordRequest([
            'oldPassword' => 'password',
            'newPassword' => 'newPassword',
        ]);

        $response = $this->put('/api/admin/members/password', $request->toArray());
        $response->assertOk();
        $this->assertTrue(Hash::check($request->newPassword, ActiveMember::find(auth()->id())->password));
    }

    public function test_パスワードの変更時にoldPasswordが違った場合エラーが発生すること(): void {
        $request = new ChangePasswordRequest([
            'oldPassword' => 'oldPassword',
            'newPassword' => 'newPassword',
        ]);

        $response = $this->put('/api/admin/members/password', $request->toArray());
        $response->assertStatus(403);
    }
}
