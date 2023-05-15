<?php

namespace Tests\Member\Unit\Repository\Admin;

use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;

class FindMeTest extends AlreadyLoggedInTestCase
{
    public function testログインしているメンバーの取得を行えること(): void
    {
        $this->memberRepo->findMe();

        $this->assertTrue(true);
    }

    public function testログインしていなかった場合はExceptionが発生すること(): void
    {
        auth()->logout();

        $this->expectException(AccessDeniedHttpException::class);

        $this->memberRepo->findMe();
    }
}
