<?php

namespace App\Domain\Beans\Member;

class MemberWithAbility {
    private string $name;
    private string $jobTitle;
    private ?string $discord;
    private ?string $twitter;
    private ?string $github;
    private string $description;
    private string $username;
    private string $password;
    private int $roleId;
    private int $creator;
    private int $updator;

    private function __construct(
        string $name,
        string $jobTitle,
        ?string $discord,
        ?string $twitter,
        ?string $github,
        string $description,
        string $username,
        string $password,
        int $roleId,
        int $creator,
        int $updator,
    ) {
        $this->name        = $name;
        $this->jobTitle    = $jobTitle;
        $this->discord     = $discord;
        $this->twitter     = $twitter;
        $this->github      = $github;
        $this->description = $description;
        $this->username    = $username;
        $this->password    = $password;
        $this->roleId      = $roleId;
        $this->creator     = $creator;
        $this->updator     = $updator;
    }

    public function name(): string {
        return $this->name;
    }

    public function jobTitle(): string {
        return $this->jobTitle;
    }

    public function discord(): ?string {
        return $this->discord;
    }

    public function twitter(): ?string {
        return $this->twitter;
    }

    public function github(): ?string {
        return $this->github;
    }

    public function description(): string {
        return $this->description;
    }

    public function username(): string {
        return $this->username;
    }

    public function password(): string {
        return $this->password;
    }

    public function roleId(): int {
        return $this->roleId;
    }

    public function creator(): int {
        return $this->creator;
    }

    public function updator(): int {
        return $this->updator;
    }

    public static function from(
        string $name,
        string $jobTitle,
        ?string $discord,
        ?string $twitter,
        ?string $github,
        string $description,
        string $username,
        string $password,
        int $roleId,
        int $creator,
        int $updator,
    ): MemberWithAbility {
        return new MemberWithAbility(
            $name,
            $jobTitle,
            $discord,
            $twitter,
            $github,
            $description,
            $username,
            $password,
            $roleId,
            $creator,
            $updator
        );
    }
}
