<?php

namespace MakeIT\Member\Repository\Interface;

use MakeIT\Member\Domain\Bean\CredentialBean;
use MakeIT\Member\Domain\Bean\MemberBean;

interface MemberRepository
{
    public function findOneByCredential(CredentialBean $credential): ?MemberBean;

    public function findOneByMemberId(int $memberId): ?MemberBean;

    public function save(MemberBean $memberBean): MemberBean;

    public function createTokenByMemberId(int $memberId): string;

    public function deleteToken(int $memberId, string $token): void;
}
