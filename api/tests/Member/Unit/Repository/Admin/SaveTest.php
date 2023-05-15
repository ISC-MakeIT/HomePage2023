<?php

namespace Tests\Member\Unit\Repository\Admin;

use Illuminate\Support\Facades\Hash;
use MakeIT\Member\Domain\Bean\Admin\MemberBean;
use MakeIT\Member\Domain\Entity\Admin\MemberConstant;
use MakeIT\Role\Domain\Bean\Admin\RoleBean;

class SaveTest extends AlreadyLoggedInTestCase
{
    public function testメンバーの作成を行うこと(): void
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

        $this->memberRepo->findOneByMemberId($createdMember->getMemberId());

        $this->assertTrue(true);
    }

    public function testメンバーの更新を行うこと(): void
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

        $this->memberRepo->save(MemberBean::from(
            $createdMember->getMemberId(),
            '_test',
            '_Programer',
            '_' . MemberConstant::MEMBER_SNS_DEFAULT_VALUE,
            '_' . MemberConstant::MEMBER_SNS_DEFAULT_VALUE,
            '_' . MemberConstant::MEMBER_SNS_DEFAULT_VALUE,
            '_description',
            'https://placehold.jp/200x200.png',
            '_testUsername',
            $createdMember->getHashedPassword(),
            2,
            true,
            RoleBean::from(
                $roles[1]->getRoleId(),
                $roles[1]->getName(),
            ),
            1,
            1,
        ));

        $forConformMember = $this->memberRepo->save($createdMember);

        $this->assertEquals($createdMember->overwrite(version: $forConformMember->getVersion()), $forConformMember);
    }
}
