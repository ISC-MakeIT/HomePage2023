<?php

namespace MakeIT\Member\Domain\Bean\Admin;

class MemberWithTokenBean
{
    private MemberBean $member;
    private string $token;

    private function __construct(string $token, MemberBean $member)
    {
        $this->token  = $token;
        $this->member = $member;
    }

    public function getToken(): string
    {
        return $this->token;
    }

    public function getMember(): MemberBean
    {
        return $this->member;
    }

    public static function from(string $token, MemberBean $member): self
    {
        return new self(
            $token,
            $member,
        );
    }
}
