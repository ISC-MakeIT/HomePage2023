<?php

namespace Tests\Feature\Member\Admin;

use App\Http\Requests\Member\Admin\EditMemberIconRequest;
use Illuminate\Http\UploadedFile;
use MakeIT\Member\Domain\Eloquent\Member as MemberORM;
use Tests\Feature\AlreadyLoggedInTestCase;

class EditMemberIconTest extends AlreadyLoggedInTestCase
{
    public function test_ログインしているメンバーのアイコンの編集を行うこと(): void
    {
        $member = MemberORM::with(['activeMember', 'nonActiveMember'])->find(auth()->id());

        $preIconUrl = '';

        if ($member->activeMember) {
            $preIconUrl = $member->activeMember->thumbnail;
        }
        if ($member->nonActiveMember) {
            $preIconUrl = $member->nonActiveMember->thumbnail;
        }

        $icon    = UploadedFile::fake()->image('dummy.jpg', 800, 800);
        $request = new EditMemberIconRequest([
            'icon' => $icon,
        ]);

        $response = $this->put('/api/admin/members/icon', $request->toArray());
        $response->assertOk();

        if ($member->activeMember) {
            $this->assertNotEquals($preIconUrl, $member->activeMember()->first()->thumbnail);
        }
        if ($member->nonActiveMember) {
            $this->assertNotEquals($preIconUrl, $member->nonActiveMember()->first()->thumbnail);
        }
    }
}
