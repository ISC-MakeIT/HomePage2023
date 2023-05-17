<?php

namespace Tests\Member\Unit\Service\Command\Admin;

use Illuminate\Support\Facades\Hash;
use MakeIT\Member\Domain\Bean\Admin\ChangeRoleBean;
use MakeIT\Member\Domain\Bean\Admin\MemberBean;
use MakeIT\Member\Domain\Eloquent\Member as MemberORM;
use MakeIT\Member\Domain\Eloquent\ActiveMember as ActiveMemberORM;
use MakeIT\Member\Domain\Eloquent\MemberAbility as MemberAbilityORM;
use MakeIT\Member\Domain\Entity\Admin\MemberConstant;
use MakeIT\Role\Domain\Eloquent\Role as RoleORM;
use MakeIT\Member\Exception\AlreadyEditedMemberException;
use MakeIT\Member\Exception\IllegalChangeMyRoleException;
use MakeIT\Member\Repository\Admin\Interface\MemberRepository;
use MakeIT\Member\Service\Command\Admin\ChangeMemberRoleService;
use MakeIT\Role\Domain\Bean\Admin\RoleBean;
use MakeIT\Role\Domain\Entity\Admin\RoleName;
use MakeIT\Role\Repository\Admin\Interface\RoleRepository;
use Mockery;
use Mockery\MockInterface;
use Tests\AlreadyLoggedInTestCase;

class ChangeMemberRoleServiceTest extends AlreadyLoggedInTestCase
{
    public function testメンバーのロール変更を行うこと(): void
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

        $me = MemberBean::from(
            $activeMemberORM->getMemberId(),
            $activeMemberORM->getName(),
            $activeMemberORM->getJobTitle(),
            $activeMemberORM->getDiscord(),
            $activeMemberORM->getTwitter(),
            $activeMemberORM->getGithub(),
            $activeMemberORM->getDescription(),
            $activeMemberORM->getThumbnail(),
            $activeMemberORM->getUsername(),
            $activeMemberORM->getHashedPassword(),
            $memberORM->getVersion(),
            true,
            RoleBean::from(
                $memberORM->getAbility()->getRole()->getRoleId(),
                $memberORM->getAbility()->getRole()->getName(),
            ),
            $memberORM->getCreator(),
            $activeMemberORM->getCreator(),
        );

        $memberRepoMock = Mockery::mock(
            MemberRepository::class,
            function (MockInterface $mock) use ($me, $targetMember) {
                $mock->shouldReceive('findMe')
                    ->once()
                    ->andReturn($me);

                $mock->shouldReceive('findOneByMemberId')
                    ->once()
                    ->andReturn($targetMember);

                $mock->shouldReceive('save')
                    ->once()
                    ->andReturn($me->overwrite(password: 'changedPassword'));
            }
        );

        $roleRepoMock = Mockery::mock(
            RoleRepository::class,
            function (MockInterface $mock) {
                $mock->shouldReceive('findOneByRoleId')
                    ->once()
                    ->andReturn(RoleBean::from(
                        2,
                        RoleName::MEMBER->toString()
                    ));
            }
        );

        $changeMemberRoleService = new ChangeMemberRoleService($memberRepoMock, $roleRepoMock);
        $editedMember = $changeMemberRoleService->execute(ChangeRoleBean::from(
            $targetMember->getMemberId(),
            2,
            $targetMember->getVersion()
        ));

        $this->assertNotEquals($targetMember, $editedMember);
    }

    public function testメンバーのロール変更で自分を変更しようとした場合Exceptionが発生すること(): void
    {
        $memberORM = MemberORM::doesntHave('archiveMember')
            ->with(['activeMember', 'nonActiveMember', 'ability.role'])
            ->find(auth()->id());

        $activeMemberORM = $memberORM->getActiveMember();

        $me = MemberBean::from(
            $activeMemberORM->getMemberId(),
            $activeMemberORM->getName(),
            $activeMemberORM->getJobTitle(),
            $activeMemberORM->getDiscord(),
            $activeMemberORM->getTwitter(),
            $activeMemberORM->getGithub(),
            $activeMemberORM->getDescription(),
            $activeMemberORM->getThumbnail(),
            $activeMemberORM->getUsername(),
            $activeMemberORM->getHashedPassword(),
            $memberORM->getVersion(),
            true,
            RoleBean::from(
                $memberORM->getAbility()->getRole()->getRoleId(),
                $memberORM->getAbility()->getRole()->getName(),
            ),
            $memberORM->getCreator(),
            $activeMemberORM->getCreator(),
        );

        $memberRepoMock = Mockery::mock(
            MemberRepository::class,
            function (MockInterface $mock) use ($me) {
                $mock->shouldReceive('findMe')
                    ->once()
                    ->andReturn($me);

                $mock->shouldReceive('save')
                    ->once()
                    ->andReturn($me->overwrite(password: 'changedPassword'));
            }
        );

        $roleRepoMock = Mockery::mock(
            RoleRepository::class,
            function (MockInterface $mock) {
                $mock->shouldReceive('findOneByRoleId')
                    ->once()
                    ->andReturn(RoleBean::from(
                        2,
                        RoleName::MEMBER->toString()
                    ));
            }
        );

        $this->expectException(IllegalChangeMyRoleException::class);
        $changeMemberRoleService = new ChangeMemberRoleService($memberRepoMock, $roleRepoMock);
        $changeMemberRoleService->execute(ChangeRoleBean::from(
            auth()->id(),
            2,
            $me->getVersion()
        ));
    }

    public function testメンバーの変更時にバージョンが違った場合Exceptionが発生すること(): void
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

        $me = MemberBean::from(
            $activeMemberORM->getMemberId(),
            $activeMemberORM->getName(),
            $activeMemberORM->getJobTitle(),
            $activeMemberORM->getDiscord(),
            $activeMemberORM->getTwitter(),
            $activeMemberORM->getGithub(),
            $activeMemberORM->getDescription(),
            $activeMemberORM->getThumbnail(),
            $activeMemberORM->getUsername(),
            $activeMemberORM->getHashedPassword(),
            $memberORM->getVersion(),
            true,
            RoleBean::from(
                $memberORM->getAbility()->getRole()->getRoleId(),
                $memberORM->getAbility()->getRole()->getName(),
            ),
            $memberORM->getCreator(),
            $activeMemberORM->getCreator(),
        );

        $memberRepoMock = Mockery::mock(
            MemberRepository::class,
            function (MockInterface $mock) use ($me, $targetMember) {
                $mock->shouldReceive('findMe')
                    ->once()
                    ->andReturn($me);

                $mock->shouldReceive('findOneByMemberId')
                    ->once()
                    ->andReturn($targetMember);

                $mock->shouldReceive('save')
                    ->once()
                    ->andReturn($me->overwrite(password: 'changedPassword'));
            }
        );

        $roleRepoMock = Mockery::mock(
            RoleRepository::class,
            function (MockInterface $mock) {
                $mock->shouldReceive('findOneByRoleId')
                    ->once()
                    ->andReturn(RoleBean::from(
                        2,
                        RoleName::MEMBER->toString()
                    ));
            }
        );

        $this->expectException(AlreadyEditedMemberException::class);
        $changeMemberRoleService = new ChangeMemberRoleService($memberRepoMock, $roleRepoMock);
        $changeMemberRoleService->execute(ChangeRoleBean::from(
            $targetMember->getMemberId(),
            2,
            $targetMember->getVersion() + 1
        ));
    }
}
