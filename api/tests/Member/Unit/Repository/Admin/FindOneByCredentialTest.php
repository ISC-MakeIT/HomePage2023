<?php

namespace Tests\Member\Unit\Repository\Admin;

use Illuminate\Support\Facades\Hash;
use MakeIT\Member\Domain\Bean\Admin\CredentialBean;
use MakeIT\Member\Domain\Eloquent\Member as MemberORM;
use MakeIT\Member\Domain\Eloquent\ActiveMember as ActiveMemberORM;
use MakeIT\Member\Domain\Eloquent\MemberAbility as MemberAbilityORM;
use MakeIT\Member\Domain\Entity\Admin\MemberConstant;
use MakeIT\Role\Domain\Eloquent\Role as RoleORM;
use MakeIT\Role\Domain\Entity\Admin\RoleName;
use Symfony\Component\HttpKernel\Exception\UnauthorizedHttpException;

class FindOneByCredentialTest extends Base
{
    protected function setUp(): void
    {
        parent::setUp();

        /** @var MemberORM */
        $member = MemberORM::create([
            'version' => 0,
            'creator' => 1,
        ]);
        ActiveMemberORM::create([
            'member_id'   => $member->getMemberId(),
            'name'        => 'test',
            'job_title'   => 'Programer',
            'discord'     => MemberConstant::MEMBER_SNS_DEFAULT_VALUE,
            'twitter'     => MemberConstant::MEMBER_SNS_DEFAULT_VALUE,
            'github'      => MemberConstant::MEMBER_SNS_DEFAULT_VALUE,
            'description' => 'test',
            'thumbnail'   => $this->faker->imageUrl(),
            'username'    => 'admin',
            'password'    => Hash::make('password'),
            'creator'     => $member->getMemberId(),
            'updator'     => $member->getMemberId(),
        ]);
        MemberAbilityORM::create([
            'member_id' => $member->getMemberId(),
            'role_id'   => RoleORM::where('name', RoleName::ADMIN->toString())->first()->role_id,
            'creator'   => $member->getMemberId(),
            'updator'   => $member->getMemberId(),
        ]);
    }

    public function testメンバーの単体取得をログイン情報で取得できること(): void
    {
        $this->memberRepo->findOneByCredential(CredentialBean::from(
            'admin',
            'password'
        ));

        $this->assertTrue(true);
    }

    public function testメンバーの単体取得でログイン情報が間違ってた場合Exceptionが発生すること(): void
    {
        $this->expectException(UnauthorizedHttpException::class);

        $this->memberRepo->findOneByCredential(CredentialBean::from(
            'admin',
            'NG'
        ));
    }
}
