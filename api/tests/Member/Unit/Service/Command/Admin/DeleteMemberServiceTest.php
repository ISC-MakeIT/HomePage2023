<?php

namespace Tests\Member\Unit\Service\Command\Admin;

use Illuminate\Support\Facades\Hash;
use MakeIT\Member\Repository\Admin\Interface\MemberRepository;
use MakeIT\Member\Service\Command\Admin\DeleteMemberService;
use MakeIT\Member\Domain\Bean\Admin\MemberBean;
use MakeIT\Member\Domain\Eloquent\Member as MemberORM;
use MakeIT\Member\Domain\Eloquent\ActiveMember as ActiveMemberORM;
use MakeIT\Member\Domain\Eloquent\MemberAbility as MemberAbilityORM;
use MakeIT\Member\Domain\Entity\Admin\MemberConstant;
use MakeIT\Role\Domain\Eloquent\Role as RoleORM;
use MakeIT\Role\Domain\Bean\Admin\RoleBean;
use MakeIT\Role\Domain\Entity\Admin\RoleName;
use Mockery;
use Mockery\MockInterface;
use Tests\AlreadyLoggedInTestCase;

class DeleteMemberServiceTest extends AlreadyLoggedInTestCase
{
    public function testメンバーの削除を行うこと(): void
    {
        /** @var MemberORM */
        $targetMemberORM = MemberORM::create([
            'version' => 0,
            'creator' => 1,
        ]);
        /** @var MemberORM */
        $targetActiveMemberORM = ActiveMemberORM::create([
            'member_id'   => $targetMemberORM->getMemberId(),
            'name'        => 'test',
            'job_title'   => 'Programer',
            'discord'     => MemberConstant::MEMBER_SNS_DEFAULT_VALUE,
            'twitter'     => MemberConstant::MEMBER_SNS_DEFAULT_VALUE,
            'github'      => MemberConstant::MEMBER_SNS_DEFAULT_VALUE,
            'description' => 'test',
            'thumbnail'   => $this->faker->imageUrl(),
            'username'    => 'targetMember',
            'password'    => Hash::make('password'),
            'creator'     => $targetMemberORM->getMemberId(),
            'updator'     => $targetMemberORM->getMemberId(),
        ]);
        /** @var MemberAbilityORM */
        MemberAbilityORM::create([
            'member_id' => $targetMemberORM->getMemberId(),
            'role_id'   => RoleORM::where('name', RoleName::ADMIN->toString())->first()->role_id,
            'creator'   => $targetMemberORM->getMemberId(),
            'updator'   => $targetMemberORM->getMemberId(),
        ]);

        $targetMember = MemberBean::from(
            $targetActiveMemberORM->getMemberId(),
            $targetActiveMemberORM->getName(),
            $targetActiveMemberORM->getJobTitle(),
            $targetActiveMemberORM->getDiscord(),
            $targetActiveMemberORM->getTwitter(),
            $targetActiveMemberORM->getGithub(),
            $targetActiveMemberORM->getDescription(),
            $targetActiveMemberORM->getThumbnail(),
            $targetActiveMemberORM->getUsername(),
            $targetActiveMemberORM->getHashedPassword(),
            $targetMemberORM->getVersion(),
            true,
            RoleBean::from(
                $targetMemberORM->getAbility()->getRole()->getRoleId(),
                $targetMemberORM->getAbility()->getRole()->getName(),
            ),
            $targetMemberORM->getCreator(),
            $targetActiveMemberORM->getCreator(),
        );

        $memberORM = MemberORM::doesntHave('archiveMember')
            ->with(['activeMember', 'nonActiveMember', 'ability.role'])
            ->find(auth()->id());

        $activeMemberORM = $memberORM->getActiveMember();

        $memberRepoMock = Mockery::mock(
            MemberRepository::class,
            function (MockInterface $mock) use ($targetMember) {
                $mock->shouldReceive('deleteByMemberId')
                    ->once()
                    ->andReturn(null);
            }
        );

        $deleteMemberService = new DeleteMemberService($memberRepoMock);
        $deleteMemberService->execute($targetMember->getMemberId());
        $this->assertTrue(true);
    }
}
