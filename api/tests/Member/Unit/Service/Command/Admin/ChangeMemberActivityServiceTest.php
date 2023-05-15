<?php

namespace Tests\Member\Unit\Service\Command\Admin;

use MakeIT\Member\Domain\Bean\Admin\ChangeActivityBean;
use Illuminate\Support\Facades\Hash;
use MakeIT\Member\Domain\Bean\Admin\MemberBean;
use MakeIT\Member\Domain\Entity\Admin\MemberConstant;
use MakeIT\Member\Domain\Eloquent\Member as MemberORM;
use MakeIT\Member\Domain\Eloquent\ActiveMember as ActiveMemberORM;
use MakeIT\Member\Domain\Eloquent\MemberAbility as MemberAbilityORM;
use MakeIT\Member\Exception\AlreadyEditedMemberException;
use MakeIT\Role\Domain\Eloquent\Role as RoleORM;
use MakeIT\Member\Repository\Admin\Interface\MemberRepository;
use MakeIT\Member\Service\Command\Admin\ChangeMemberActivityService;
use MakeIT\Role\Domain\Bean\Admin\RoleBean;
use MakeIT\Role\Domain\Entity\Admin\RoleName;
use Mockery;
use Mockery\MockInterface;
use Tests\BaseTestCase;

class ChangeMemberActivityServiceTest extends BaseTestCase
{
    public function testメンバーの表示状態の変更を行うこと(): void
    {
        /** @var MemberORM */
        $memberORM = MemberORM::create([
            'version' => 1,
            'creator' => 1,
        ]);

        /** @var ActiveMemberORM */
        $activeMemberORM = ActiveMemberORM::create([
            'member_id'   => $memberORM->getMemberId(),
            'name'        => 'test',
            'job_title'   => 'Programer',
            'discord'     => MemberConstant::MEMBER_SNS_DEFAULT_VALUE,
            'twitter'     => MemberConstant::MEMBER_SNS_DEFAULT_VALUE,
            'github'      => MemberConstant::MEMBER_SNS_DEFAULT_VALUE,
            'description' => 'test',
            'thumbnail'   => 'https://placehold.jp/150x150.png',
            'username'    => 'admin',
            'password'    => Hash::make('password'),
            'creator'     => $memberORM->getMemberId(),
            'updator'     => $memberORM->getMemberId(),
        ]);

        /** @var MemberAbilityORM */
        $memberAbilityORM = MemberAbilityORM::create([
            'member_id' => $memberORM->getMemberId(),
            'role_id'   => RoleORM::where('name', RoleName::ADMIN->toString())->first()->role_id,
            'creator'   => $memberORM->getMemberId(),
            'updator'   => $memberORM->getMemberId(),
        ]);

        $result = MemberBean::from(
            $memberORM->getMemberId(),
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
            false,
            RoleBean::from(
                $memberAbilityORM->getRole()->getRoleId(),
                $memberAbilityORM->getRole()->getName(),
            ),
            $memberORM->getCreator(),
            $activeMemberORM->getCreator(),
        );

        $memberRepoMock = Mockery::mock(
            MemberRepository::class,
            function (MockInterface $mock) use ($memberORM, $activeMemberORM, $memberAbilityORM, $result) {
                $mock->shouldReceive('findOneByMemberId')
                    ->once()
                    ->andReturn(
                        MemberBean::from(
                            $memberORM->getMemberId(),
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
                                $memberAbilityORM->getRole()->getRoleId(),
                                $memberAbilityORM->getRole()->getName(),
                            ),
                            $memberORM->getCreator(),
                            $activeMemberORM->getCreator(),
                        )
                    );

                $mock->shouldReceive('save')
                    ->once()
                    ->andReturn($result);
            }
        );

        $changeMemberActivityService = new ChangeMemberActivityService($memberRepoMock);
        $editedMember                = $changeMemberActivityService->execute(ChangeActivityBean::from(
            $memberORM->getMemberId(),
            false,
            $memberORM->getVersion()
        ));

        $this->assertEquals($editedMember, $result);
    }

    public function testメンバーの変更時にバージョンが違った場合Exceptionが発生すること(): void
    {
        /** @var MemberORM */
        $memberORM = MemberORM::create([
            'version' => 1,
            'creator' => 1,
        ]);

        /** @var ActiveMemberORM */
        $activeMemberORM = ActiveMemberORM::create([
            'member_id'   => $memberORM->getMemberId(),
            'name'        => 'test',
            'job_title'   => 'Programer',
            'discord'     => MemberConstant::MEMBER_SNS_DEFAULT_VALUE,
            'twitter'     => MemberConstant::MEMBER_SNS_DEFAULT_VALUE,
            'github'      => MemberConstant::MEMBER_SNS_DEFAULT_VALUE,
            'description' => 'test',
            'thumbnail'   => 'https://placehold.jp/150x150.png',
            'username'    => 'admin',
            'password'    => Hash::make('password'),
            'creator'     => $memberORM->getMemberId(),
            'updator'     => $memberORM->getMemberId(),
        ]);

        /** @var MemberAbilityORM */
        $memberAbilityORM = MemberAbilityORM::create([
            'member_id' => $memberORM->getMemberId(),
            'role_id'   => RoleORM::where('name', RoleName::ADMIN->toString())->first()->role_id,
            'creator'   => $memberORM->getMemberId(),
            'updator'   => $memberORM->getMemberId(),
        ]);

        $memberRepoMock = Mockery::mock(
            MemberRepository::class,
            function (MockInterface $mock) use ($memberORM, $activeMemberORM, $memberAbilityORM) {
                $mock->shouldReceive('findOneByMemberId')
                    ->once()
                    ->andReturn(
                        MemberBean::from(
                            $memberORM->getMemberId(),
                            $activeMemberORM->getName(),
                            $activeMemberORM->getJobTitle(),
                            $activeMemberORM->getDiscord(),
                            $activeMemberORM->getTwitter(),
                            $activeMemberORM->getGithub(),
                            $activeMemberORM->getDescription(),
                            $activeMemberORM->getThumbnail(),
                            $activeMemberORM->getUsername(),
                            $activeMemberORM->getHashedPassword(),
                            $memberORM->getVersion() + 1,
                            true,
                            RoleBean::from(
                                $memberAbilityORM->getRole()->getRoleId(),
                                $memberAbilityORM->getRole()->getName(),
                            ),
                            $memberORM->getCreator(),
                            $activeMemberORM->getCreator(),
                        )
                    );
            }
        );

        $this->expectException(AlreadyEditedMemberException::class);

        $changeMemberActivityService = new ChangeMemberActivityService($memberRepoMock);
        $changeMemberActivityService->execute(ChangeActivityBean::from(
            $memberORM->getMemberId(),
            false,
            $memberORM->getVersion()
        ));
    }
}
