<?php

namespace MakeIT\Member\Domain\Bean;

class CredentialBean
{
    private string $username;
    private string $password;

    private function __construct(string $username, string $password)
    {
        $this->username = $username;
        $this->password = $password;
    }

    public function getUsername(): string
    {
        return $this->username;
    }

    public function getPassword(): string
    {
        return $this->password;
    }

    public static function from(string $username, string $password): self
    {
        return new self($username, $password);
    }
}
