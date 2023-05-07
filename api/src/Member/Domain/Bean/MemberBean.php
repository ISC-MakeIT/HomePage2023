<?php

namespace MakeIT\Member\Domain\Bean;

use MakeIT\Member\Domain\Entity\MemberConstant;
use MakeIT\Role\Domain\Bean\Role;

class MemberBean
{
    private int $memberId;
    private string $name;
    private string $jobTitle;
    private string $discord;
    private string $twitter;
    private string $github;
    private string $description;
    private string $thumbnail;
    private string $username;
    private string $password;
    private int $version;
    private bool $isActive;
    private Role $role;
    private int $creator;
    private int $updator;

    private function __construct(
        int $memberId,
        string $name,
        string $jobTitle,
        string $discord,
        string $twitter,
        string $github,
        string $description,
        string $thumbnail,
        string $username,
        string $password,
        int $version,
        bool $isActive,
        Role $role,
        int $creator,
        int $updator,
    ) {
        $this->memberId    = $memberId;
        $this->name        = $name;
        $this->jobTitle    = $jobTitle;
        $this->discord     = $discord;
        $this->twitter     = $twitter;
        $this->github      = $github;
        $this->description = $description;
        $this->thumbnail   = $thumbnail;
        $this->username    = $username;
        $this->password    = $password;
        $this->version     = $version;
        $this->isActive    = $isActive;
        $this->role        = $role;
        $this->creator     = $creator;
        $this->updator     = $updator;
    }

    public function getMemberId(): int
    {
        return $this->memberId;
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function getJobTitle(): string
    {
        return $this->jobTitle;
    }

    public function getDiscord(): string
    {
        return $this->discord;
    }

    public function getTwitter(): string
    {
        return $this->twitter;
    }

    public function getGithub(): string
    {
        return $this->github;
    }

    public function getDescription(): string
    {
        return $this->description;
    }

    public function getThumbnail(): string
    {
        return $this->thumbnail;
    }

    public function getUsername(): string
    {
        return $this->username;
    }

    public function getHashedPassword(): string
    {
        return $this->password;
    }

    public function getVersion(): int
    {
        return $this->version;
    }

    public function getIsActive(): bool
    {
        return $this->isActive;
    }

    public function getRole(): Role
    {
        return $this->role;
    }

    public function getCreator(): int
    {
        return $this->creator;
    }

    public function getUpdator(): int
    {
        return $this->updator;
    }

    public function overwrite(
        ?int $memberId = null,
        ?string $name = null,
        ?string $jobTitle = null,
        ?string $discord = null,
        ?string $twitter = null,
        ?string $github = null,
        ?string $description = null,
        ?string $thumbnail = null,
        ?string $username = null,
        ?string $password = null,
        ?int $version = null,
        ?bool $isActive = null,
        ?Role $role = null,
        ?int $creator = null,
        ?int $updator = null,
    ): self {
        return new self(
            $memberId    ?? $this->memberId,
            $name        ?? $this->name,
            $jobTitle    ?? $this->jobTitle,
            $discord     ?? $this->discord,
            $twitter     ?? $this->twitter,
            $github      ?? $this->github,
            $description ?? $this->description,
            $thumbnail   ?? $this->thumbnail,
            $username    ?? $this->username,
            $password    ?? $this->password,
            $version     ?? $this->version,
            $isActive    ?? $this->isActive,
            $role        ?? $this->role,
            $creator     ?? $this->creator,
            $updator     ?? $this->updator
        );
    }

    public static function from(
        int $memberId,
        string $name,
        string $jobTitle,
        string $discord,
        string $twitter,
        string $github,
        string $description,
        string $thumbnail,
        string $username,
        ?string $password = MemberConstant::PASSWORD_DEFAULT_VALUE,
        int $version,
        bool $isActive,
        Role $role,
        int $creator,
        int $updator,
    ): self {
        return new self(
            $memberId,
            $name,
            $jobTitle,
            $discord,
            $twitter,
            $github,
            $description,
            $thumbnail,
            $username,
            $password,
            $version,
            $isActive,
            $role,
            $creator,
            $updator
        );
    }
}
