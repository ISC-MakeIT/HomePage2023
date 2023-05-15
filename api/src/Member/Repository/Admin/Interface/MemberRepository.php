<?php

namespace MakeIT\Member\Repository\Admin\Interface;

use MakeIT\Member\Domain\Bean\Admin\CredentialBean;
use MakeIT\Member\Domain\Bean\Admin\MemberBean;

interface MemberRepository
{
    /** @return array<MemberBean> */
    public function findAll(): array;

    public function findOneByCredential(CredentialBean $credential): MemberBean;

    public function findOneByMemberId(int $memberId): MemberBean;

    public function findMe(): MemberBean;

    public function save(MemberBean $memberBean): MemberBean;

    public function deleteByMemberId(int $memberId): void;

    public function createTokenByMemberId(int $memberId): string;

    public function deleteToken(int $memberId, string $token): void;
}
