<?php

namespace Tests\Member\Unit\Repository\Admin;

use Illuminate\Database\Eloquent\ModelNotFoundException;
use MakeIT\Member\Domain\Eloquent\Member as MemberORM;

class FindOneByMemberIdTest extends Base
{
    protected function setUp(): void
    {
        parent::setUp();
    }

    public function testメンバーの単体取得を行えること(): void
    {
        /** @var MemberORM */
        $member = MemberORM::first();

        $this->memberRepo->findOneByMemberId($member->getMemberId());

        $this->assertTrue(true);
    }

    public function testメンバーの単体取得で取得できなかった場合はExceptionが発生すること(): void
    {
        $this->expectException(ModelNotFoundException::class);

        $this->memberRepo->findOneByMemberId(10000);
    }
}
