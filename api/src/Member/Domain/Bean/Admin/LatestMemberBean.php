<?php

namespace MakeIT\Member\Domain\Bean\Admin;

class LatestMemberBean
{
    private string $name;
    private string $jobTitle;
    private ?string $discord;
    private ?string $twitter;
    private ?string $github;
    private string $description;
    private bool $isActive;
    private int $version;

    private function __construct(
        string $name,
        string $jobTitle,
        ?string $discord,
        ?string $twitter,
        ?string $github,
        string $description,
        bool $isActive,
        int $version,
    ) {
        $this->name        = $name;
        $this->jobTitle    = $jobTitle;
        $this->discord     = $discord;
        $this->twitter     = $twitter;
        $this->github      = $github;
        $this->description = $description;
        $this->isActive    = $isActive;
        $this->version     = $version;
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function getJobTitle(): string
    {
        return $this->jobTitle;
    }

    public function getDiscord(): ?string
    {
        return $this->discord;
    }

    public function getTwitter(): ?string
    {
        return $this->twitter;
    }

    public function getGithub(): ?string
    {
        return $this->github;
    }

    public function getDescription(): string
    {
        return $this->description;
    }

    public function getIsActive(): bool
    {
        return $this->isActive;
    }

    public function getVersion(): int
    {
        return $this->version;
    }

    public function overwrite(
        ?string $name = null,
        ?string $jobTitle = null,
        ?string $discord = null,
        ?string $twitter = null,
        ?string $github = null,
        ?string $description = null,
        ?bool $isActive = null,
        ?int $version = null,
    ): self {
        return new self(
            $name        ?? $this->name,
            $jobTitle    ?? $this->jobTitle,
            $discord     ?? $this->discord,
            $twitter     ?? $this->twitter,
            $github      ?? $this->github,
            $description ?? $this->description,
            $isActive    ?? $this->isActive,
            $version     ?? $this->version,
        );
    }

    public static function from(
        string $name,
        string $jobTitle,
        string $discord,
        ?string $twitter,
        ?string $github,
        ?string $description,
        bool $isActive,
        int $version,
    ): self {
        return new self(
            $name,
            $jobTitle,
            $discord,
            $twitter,
            $github,
            $description,
            $isActive,
            $version,
        );
    }
}
