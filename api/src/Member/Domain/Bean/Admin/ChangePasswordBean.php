<?php

namespace MakeIT\Member\Domain\Bean\Admin;

class ChangePasswordBean
{
    private string $oldPassword;
    private string $newPassword;

    private function __construct(string $oldPassword, string $newPassword)
    {
        $this->oldPassword = $oldPassword;
        $this->newPassword = $newPassword;
    }

    public function getOldPassword(): string
    {
        return $this->oldPassword;
    }

    public function getNewPassword(): string
    {
        return $this->newPassword;
    }

    public static function from(string $oldPassword, string $newPassword): self
    {
        return new self(
            $oldPassword,
            $newPassword,
        );
    }
}