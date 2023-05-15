<?php

namespace Tests\Member\Unit\Repository\Admin;

use App\Exceptions\Common\DataIntegrityViolationException;
use MakeIT\Member\Domain\Eloquent\Member as MemberORM;

class FindAllMemberTest extends Base
{
    public function testメンバーの一覧取得を行えること(): void
    {
        $members = $this->memberRepo->findAll();

        $this->assertCount(
            count($members),
            MemberORM::doesntHave('archiveMember')
                ->with(['activeMember', 'nonActiveMember', 'ability.role'])
                ->get()
                ->toArray()
        );
    }

    public function testメンバーに表示状態を管理する子テーブルが存在しなかった場合Exceptionが発生すること(): void
    {
        MemberORM::create([
            'version' => 1,
            'creator' => 0,
        ]);

        $this->expectException(DataIntegrityViolationException::class);
        $this->memberRepo->findAll();
    }
}
