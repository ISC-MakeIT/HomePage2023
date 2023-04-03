<?php

namespace Tests\Feature\Member\User;

use App\Http\Resources\Member\User\MembersResource;
use App\Models\Member\ActiveMember;
use Illuminate\Http\Request;
use Tests\TestCase;

class MembersTest extends TestCase {
    public function test_メンバーの一覧取得を行うこと(): void {
        $response = $this->get('/api/members');
        $response->assertOk();
        $response->assertJson(MembersResource::collection(ActiveMember::all())->toArray(new Request()));
    }
}
