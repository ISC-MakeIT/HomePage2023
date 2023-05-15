<?php

namespace Tests\Member\Unit\Repository\Admin;

use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\Hash;
use MakeIT\Member\Domain\Bean\Admin\MemberBean;
use MakeIT\Member\Domain\Entity\Admin\MemberConstant;
use MakeIT\Role\Domain\Bean\Admin\RoleBean;

class CreateTokenByMemberIdTest extends AlreadyLoggedInTestCase
{
    public function testメンバーのトークン生成を行うこと(): void
    {
        $roles = $this->roleRepo->findAll();

        $createdMember = $this->memberRepo->save(MemberBean::from(
            MemberConstant::MEMBER_ID_DEFAULT_VALUE,
            'test',
            'Programer',
            MemberConstant::MEMBER_SNS_DEFAULT_VALUE,
            MemberConstant::MEMBER_SNS_DEFAULT_VALUE,
            MemberConstant::MEMBER_SNS_DEFAULT_VALUE,
            'description',
            'https://placehold.jp/150x150.png',
            'testUsername',
            Hash::make('password'),
            1,
            false,
            RoleBean::from(
                $roles[0]->getRoleId(),
                $roles[0]->getName(),
            ),
            1,
            1,
        ));

        $token = $this->memberRepo->createTokenByMemberId($createdMember->getMemberId());
        $this->assertNotEmpty($token);
    }

    public function testメンバーが存在しなかった場合Exceptionが発生すること(): void
    {
        $this->expectException(ModelNotFoundException::class);
        $this->memberRepo->createTokenByMemberId(10000);
    }
}
