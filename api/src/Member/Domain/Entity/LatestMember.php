<?php

namespace MakeIT\Member\Domain\Bean;

class LatestMember
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

    public function isSameVersion(int $anotherVersion): bool
    {
        return $this->getVersion() === $anotherVersion;
    }

    public function isDifferentVersion(int $anotherVersion): bool
    {
        return !$this->isSameVersion($anotherVersion);
    }

    public static function fromBean(LatestMemberBean $latestMemberBean): self
    {
        return new self(
            $latestMemberBean->getName(),
            $latestMemberBean->getJobTitle(),
            $latestMemberBean->getDiscord(),
            $latestMemberBean->getTwitter(),
            $latestMemberBean->getGithub(),
            $latestMemberBean->getDescription(),
            $latestMemberBean->getIsActive(),
            $latestMemberBean->getVersion(),
        );
    }
}
