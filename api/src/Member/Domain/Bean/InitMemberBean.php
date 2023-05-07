<?php

namespace MakeIT\Member\Domain\Bean;

use Illuminate\Http\UploadedFile;

class InitMemberBean
{
    private string $name;
    private string $jobTitle;
    private int $roleId;
    private ?string $discord;
    private ?string $twitter;
    private ?string $github;
    private string $description;
    private UploadedFile $icon;
    private string $username;
    private string $password;

    private function __construct(
        string $name,
        string $jobTitle,
        int $roleId,
        ?string $discord,
        ?string $twitter,
        ?string $github,
        string $description,
        UploadedFile $icon,
        string $username,
        string $password,
    ) {
        $this->name        = $name;
        $this->jobTitle    = $jobTitle;
        $this->roleId      = $roleId;
        $this->discord     = $discord;
        $this->twitter     = $twitter;
        $this->github      = $github;
        $this->description = $description;
        $this->icon        = $icon;
        $this->username    = $username;
        $this->password    = $password;
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function getJobTitle(): string
    {
        return $this->jobTitle;
    }

    public function getRoleId(): int
    {
        return $this->roleId;
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

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function getIcon(): UploadedFile
    {
        return $this->icon;
    }

    public function getUsername(): string
    {
        return $this->username;
    }

    public function getPassword(): string
    {
        return $this->password;
    }

    public static function from(
        string $name,
        string $jobTitle,
        int $roleId,
        ?string $discord,
        ?string $twitter,
        ?string $github,
        string $description,
        UploadedFile $icon,
        string $username,
        string $password,
    ): self {
        return new self(
            $name,
            $jobTitle,
            $roleId,
            $discord,
            $twitter,
            $github,
            $description,
            $icon,
            $username,
            $password,
        );
    }
}
