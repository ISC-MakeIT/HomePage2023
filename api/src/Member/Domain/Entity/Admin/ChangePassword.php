<?php

namespace MakeIT\Member\Domain\Entity\Admin;

use Illuminate\Support\Facades\Hash;
use MakeIT\Member\Domain\Bean\Admin\ChangePasswordBean;

class ChangePassword
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

    public function isSameOldPassword(string $hashedOldPassword): bool
    {
        return Hash::check($this->getOldPassword(), $hashedOldPassword);
    }

    public function isDifferentOldPassword(string $hashedOldPassword): bool
    {
        return !$this->isSameOldPassword($hashedOldPassword);
    }

    public static function fromBean(ChangePasswordBean $changePasswordBean): self
    {
        return new self(
            $changePasswordBean->getOldPassword(),
            $changePasswordBean->getNewPassword(),
        );
    }
}
