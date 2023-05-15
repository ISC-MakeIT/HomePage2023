<?php

namespace MakeIT\Member\Repository\Admin;

use App\Exceptions\Common\DataIntegrityViolationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use MakeIT\Member\Domain\Bean\Admin\CredentialBean;
use MakeIT\Member\Domain\Bean\Admin\MemberBean;
use MakeIT\Member\Domain\Eloquent\Member as MemberORM;
use MakeIT\Member\Domain\Eloquent\ActiveMember as ActiveMemberORM;
use MakeIT\Member\Domain\Eloquent\NonActiveMember as NonActiveMemberORM;
use MakeIT\Member\Domain\Eloquent\ArchiveMember as ArchiveMemberORM;
use MakeIT\Member\Domain\Eloquent\MemberAbility as MemberAbilityORM;
use MakeIT\Role\Domain\Bean\Admin\RoleBean;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Symfony\Component\HttpKernel\Exception\UnauthorizedHttpException;

class MemberRepository implements \MakeIT\Member\Repository\Admin\Interface\MemberRepository
{
    /** @return array<MemberBean> */
    public function findAll(): array
    {
        return MemberORM::doesntHave('archiveMember')
            ->with(['activeMember', 'nonActiveMember', 'ability.role'])
            ->get()
            ->map(function (MemberORM $memberORM) {
                if ($memberORM->getActiveMember()) {
                    $activeMemberORM = $memberORM->getActiveMember();

                    return MemberBean::from(
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
                }

                if ($memberORM->getNonActiveMember()) {
                    $nonActiveMemberORM = $memberORM->getNonActiveMember();

                    return MemberBean::from(
                        $nonActiveMemberORM->getMemberId(),
                        $nonActiveMemberORM->getName(),
                        $nonActiveMemberORM->getJobTitle(),
                        $nonActiveMemberORM->getDiscord(),
                        $nonActiveMemberORM->getTwitter(),
                        $nonActiveMemberORM->getGithub(),
                        $nonActiveMemberORM->getDescription(),
                        $nonActiveMemberORM->getThumbnail(),
                        $nonActiveMemberORM->getUsername(),
                        $nonActiveMemberORM->getHashedPassword(),
                        $memberORM->getVersion(),
                        false,
                        RoleBean::from(
                            $memberORM->getAbility()->getRole()->getRoleId(),
                            $memberORM->getAbility()->getRole()->getName(),
                        ),
                        $memberORM->getCreator(),
                        $nonActiveMemberORM->getCreator(),
                    );
                }

                throw new DataIntegrityViolationException("メンバーの状態を管理する，active_members, non_active_membersテーブルが存在しません");
            })
            ->toArray();
    }

    public function findOneByCredential(CredentialBean $credential): MemberBean
    {
        /** @var ?ActiveMemberORM */
        $activeMemberORM = ActiveMemberORM::where('username', $credential->getUsername())->first();

        if ($activeMemberORM && Hash::check($credential->getPassword(), $activeMemberORM->getHashedPassword())) {
            /** @var MemberORM */
            $memberORM = MemberORM::with('ability.role')->find($activeMemberORM->getMemberId());

            return MemberBean::from(
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
        }

        /** @var ?NonActiveMemberORM */
        $nonActiveMemberORM = NonActiveMemberORM::where('username', $credential->getUsername())->first();

        if ($nonActiveMemberORM && Hash::check($credential->getPassword(), $nonActiveMemberORM->getHashedPassword())) {
            /** @var MemberORM */
            $memberORM = MemberORM::with('ability.role')->find($activeMemberORM->getMemberId());

            return MemberBean::from(
                $nonActiveMemberORM->getMemberId(),
                $nonActiveMemberORM->getName(),
                $nonActiveMemberORM->getJobTitle(),
                $nonActiveMemberORM->getDiscord(),
                $nonActiveMemberORM->getTwitter(),
                $nonActiveMemberORM->getGithub(),
                $nonActiveMemberORM->getDescription(),
                $nonActiveMemberORM->getThumbnail(),
                $nonActiveMemberORM->getUsername(),
                $nonActiveMemberORM->getHashedPassword(),
                $memberORM->getVersion(),
                false,
                RoleBean::from(
                    $memberORM->getAbility()->getRole()->getRoleId(),
                    $memberORM->getAbility()->getRole()->getName(),
                ),
                $memberORM->getCreator(),
                $nonActiveMemberORM->getCreator(),
            );
        }

        throw new UnauthorizedHttpException('ユーザー名かパスワードが違います。');
    }

    public function findOneByMemberId(int $memberId): MemberBean
    {
        /** @var ?MemberORM */
        $memberORM = MemberORM::doesntHave('archiveMember')
            ->with(['activeMember', 'nonActiveMember', 'ability.role'])
            ->find($memberId);

        if (!$memberORM) {
            throw new ModelNotFoundException('存在しないユーザーです。');
        }

        if ($memberORM->getActiveMember()) {
            $activeMemberORM = $memberORM->getActiveMember();

            return MemberBean::from(
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
        }

        if ($memberORM->getNonActiveMember()) {
            $nonActiveMemberORM = $memberORM->getNonActiveMember();

            return MemberBean::from(
                $nonActiveMemberORM->getMemberId(),
                $nonActiveMemberORM->getName(),
                $nonActiveMemberORM->getJobTitle(),
                $nonActiveMemberORM->getDiscord(),
                $nonActiveMemberORM->getTwitter(),
                $nonActiveMemberORM->getGithub(),
                $nonActiveMemberORM->getDescription(),
                $nonActiveMemberORM->getThumbnail(),
                $nonActiveMemberORM->getUsername(),
                $nonActiveMemberORM->getHashedPassword(),
                $memberORM->getVersion(),
                false,
                RoleBean::from(
                    $memberORM->getAbility()->getRole()->getRoleId(),
                    $memberORM->getAbility()->getRole()->getName(),
                ),
                $memberORM->getCreator(),
                $nonActiveMemberORM->getCreator(),
            );
        }

        throw new DataIntegrityViolationException("メンバーの状態を管理する，active_members, non_active_membersテーブルが存在しません");
    }

    public function findMe(): MemberBean
    {
        if (!auth()->id()) {
            throw new AccessDeniedHttpException('ログインを行ってください。');
        }

        return $this->findOneByMemberId(auth()->id());
    }

    public function save(MemberBean $memberBean): MemberBean
    {
        /** @var ?MemberORM */
        $memberORM = MemberORM::doesntHave('archiveMember')
            ->with(['activeMember', 'nonActiveMember', 'ability.role'])
            ->find($memberBean->getMemberId());

        if (!$memberORM) {
            return DB::transaction(function () use ($memberBean) {
                /** @var MemberORM */
                $createdMemberORM = MemberORM::create([
                    'creator' => auth()->id()
                ]);
                NonActiveMemberORM::create([
                    'member_id'   => $createdMemberORM->getMemberId(),
                    'name'        => $memberBean->getName(),
                    'job_title'   => $memberBean->getJobTitle(),
                    'discord'     => $memberBean->getDiscord(),
                    'twitter'     => $memberBean->getTwitter(),
                    'github'      => $memberBean->getGithub(),
                    'description' => $memberBean->getDescription(),
                    'thumbnail'   => $memberBean->getThumbnail(),
                    'username'    => $memberBean->getUsername(),
                    'password'    => $memberBean->getHashedPassword(),
                    'creator'     => auth()->id(),
                ]);
                MemberAbilityORM::create([
                    'member_id' => $createdMemberORM->getMemberId(),
                    'role_id'   => $memberBean->getRole()->getRoleId(),
                    'creator'   => auth()->id(),
                    'updator'   => auth()->id(),
                ]);

                return $memberBean->overwrite(
                    memberId: $createdMemberORM->getMemberId(),
                );
            }, 3);
        }

        return DB::transaction(function () use ($memberORM, $memberBean) {
            $memberORM->activeMember()->delete();
            $memberORM->nonActiveMember()->delete();

            $memberORM->version = $memberBean->getVersion() + 1;
            $memberORM->update();

            $latestMemberBean = $memberBean->overwrite(version: $memberORM->getVersion());

            /** @var MemberAbilityORM */
            $memberAbilityORM          = MemberAbilityORM::where('member_id', $latestMemberBean->getMemberId())->first();
            $memberAbilityORM->role_id = $latestMemberBean->getRole()->getRoleId();
            $memberAbilityORM->update();

            if ($latestMemberBean->getIsActive()) {
                ActiveMemberORM::create([
                    'member_id'   => $latestMemberBean->getMemberId(),
                    'name'        => $latestMemberBean->getName(),
                    'job_title'   => $latestMemberBean->getJobTitle(),
                    'discord'     => $latestMemberBean->getDiscord(),
                    'twitter'     => $latestMemberBean->getTwitter(),
                    'github'      => $latestMemberBean->getGithub(),
                    'description' => $latestMemberBean->getDescription(),
                    'thumbnail'   => $latestMemberBean->getThumbnail(),
                    'username'    => $latestMemberBean->getUsername(),
                    'password'    => $latestMemberBean->getHashedPassword(),
                    'creator'     => auth()->id(),
                ]);

                return $latestMemberBean;
            }

            NonActiveMemberORM::create([
                'member_id'   => $latestMemberBean->getMemberId(),
                'name'        => $latestMemberBean->getName(),
                'job_title'   => $latestMemberBean->getJobTitle(),
                'discord'     => $latestMemberBean->getDiscord(),
                'twitter'     => $latestMemberBean->getTwitter(),
                'github'      => $latestMemberBean->getGithub(),
                'description' => $latestMemberBean->getDescription(),
                'thumbnail'   => $latestMemberBean->getThumbnail(),
                'username'    => $latestMemberBean->getUsername(),
                'password'    => $latestMemberBean->getHashedPassword(),
                'creator'     => auth()->id(),
            ]);

            return $latestMemberBean;
        }, 3);
    }

    public function deleteByMemberId(int $memberId): void
    {
        /** @var MemberORM */
        $memberORM = MemberORM::doesntHave('archiveMember')
            ->with(['activeMember', 'nonActiveMember'])
            ->find($memberId);

        if (!$memberORM) {
            throw new ModelNotFoundException('存在しないユーザーです。');
        }

        DB::transaction(function () use ($memberORM) {
            $memberORM->activeMember()->delete();
            $memberORM->nonActiveMember()->delete();

            if ($memberORM->getActiveMember()) {
                $activeMember = $memberORM->getActiveMember();

                ArchiveMemberORM::create([
                    'member_id'   => $activeMember->getMemberId(),
                    'name'        => $activeMember->getName(),
                    'job_title'   => $activeMember->getJobTitle(),
                    'discord'     => $activeMember->getDiscord(),
                    'twitter'     => $activeMember->getTwitter(),
                    'github'      => $activeMember->getGithub(),
                    'description' => $activeMember->getDiscord(),
                    'thumbnail'   => $activeMember->getThumbnail(),
                    'username'    => $activeMember->getUsername(),
                    'password'    => $activeMember->getHashedPassword(),
                    'creator'     => auth()->id()
                ]);
                return;
            }
            if ($memberORM->getNonActiveMember()) {
                $nonActiveMemberORM = $memberORM->getNonActiveMember();

                ArchiveMemberORM::create([
                    'member_id'   => $nonActiveMemberORM->getMemberId(),
                    'name'        => $nonActiveMemberORM->getName(),
                    'job_title'   => $nonActiveMemberORM->getJobTitle(),
                    'discord'     => $nonActiveMemberORM->getDiscord(),
                    'twitter'     => $nonActiveMemberORM->getTwitter(),
                    'github'      => $nonActiveMemberORM->getGithub(),
                    'description' => $nonActiveMemberORM->getDescription(),
                    'thumbnail'   => $nonActiveMemberORM->getThumbnail(),
                    'username'    => $nonActiveMemberORM->getUsername(),
                    'password'    => $nonActiveMemberORM->getHashedPassword(),
                    'creator'     => auth()->id()
                ]);
                return;
            }

            throw new DataIntegrityViolationException("メンバーの状態を管理する，active_members, non_active_membersテーブルが存在しません");
        }, 3);
    }

    public function createTokenByMemberId(int $memberId): string
    {
        /** @var ?MemberORM */
        $memberORM = MemberORM::find($memberId);

        if (!$memberORM) {
            throw new ModelNotFoundException('存在しないユーザーです。');
        }

        return MemberORM::find($memberId)->createToken(config('app.key'))->plainTextToken;
    }

    public function deleteToken(int $memberId, string $currentToken): void
    {
        $tokenId = Str::before($currentToken, '|');
        MemberORM::find($memberId)->tokens()->where('id', $tokenId)->delete();
    }
}
