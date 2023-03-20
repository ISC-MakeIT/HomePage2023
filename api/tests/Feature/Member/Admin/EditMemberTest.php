<?php

namespace Tests\Feature\Member\Admin;

use App\Http\Requests\Member\Admin\EditMemberRequest;
use App\Models\Member\NonActiveMember;
use Tests\Feature\AlreadyLoggedInTestCase;

class EditMemberTest extends AlreadyLoggedInTestCase {
    public function test_ログインしているメンバーの編集を行うこと(): void {
        $request = new EditMemberRequest([
            'name'        => 'test_of_test',
            'jobTitle'    => 'Programer',
            'discord'     => 'test#1111',
            'twitter'     => '@test',
            'github'      => 'Test',
            'description' => '__________test',
            'isActive'    => false,
        ]);

        $response = $this->put('/api/admin/members', $request->toArray());
        $response->assertOk();
        $nonActiveMember = NonActiveMember::find(auth()->id());

        $this->assertNotEmpty($nonActiveMember);
        $this->assertEquals($request->toArray(), [
            'name'        => $nonActiveMember->name,
            'jobTitle'    => $nonActiveMember->job_title,
            'discord'     => $nonActiveMember->discord,
            'twitter'     => $nonActiveMember->twitter,
            'github'      => $nonActiveMember->github,
            'description' => $nonActiveMember->description,
            'isActive'    => false,
        ]);
    }
}
