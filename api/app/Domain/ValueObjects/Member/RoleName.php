<?php

namespace App\Domain\ValueObjects\Member;

enum RoleName: string {
    case ADMIN  = 'ADMIN';
    case MEMBER = 'MEMBER';
    case TRIAL  = 'TRIAL';

    public function toString(): string {
        return $this->value;
    }
}
