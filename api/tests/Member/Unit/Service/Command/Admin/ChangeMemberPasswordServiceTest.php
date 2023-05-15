<?php

namespace Tests\Member\Unit\Service\Command\Admin;

use MakeIT\Member\Domain\Bean\Admin\ChangePasswordBean;
use MakeIT\Member\Domain\Bean\Admin\MemberBean;
use MakeIT\Member\Domain\Eloquent\Member as MemberORM;
use MakeIT\Member\Exception\IllegalPasswordDifferentException;
use MakeIT\Member\Repository\Admin\Interface\MemberRepository;
use MakeIT\Member\Service\Command\Admin\ChangeMemberPasswordService;
use MakeIT\Role\Domain\Bean\Admin\RoleBean;
use Mockery;
use Mockery\MockInterface;
use Tests\AlreadyLoggedInTestCase;

class ChangeMemberPasswordServiceTest extends AlreadyLoggedInTestCase
{
    public function testメンバーのパスワードの変更を行うこと(): void
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

        $changeMemberPasswordService = new ChangeMemberPasswordService($memberRepoMock);
        $editedMember                = $changeMemberPasswordService->execute(ChangePasswordBean::from(
            'password',
            'newPassword',
        ));

        $this->assertNotEquals($me, $editedMember);
    }

    public function testメンバーのパスワード変更時にOldPasswordが違った場合Exceptionが発生すること(): void
    {
        $memberRepoMock = Mockery::mock(
            MemberRepository::class,
            function (MockInterface $mock) {
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

                $mock->shouldReceive('findMe')
                    ->once()
                    ->andReturn($me);
            }
        );

        $this->expectException(IllegalPasswordDifferentException::class);

        $changeMemberPasswordService = new ChangeMemberPasswordService($memberRepoMock);
        $changeMemberPasswordService->execute(ChangePasswordBean::from(
            'differentPassword',
            'newPassword',
        ));
    }
}
