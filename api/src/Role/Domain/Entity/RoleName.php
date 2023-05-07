<?php

namespace MakeIT\Role\Domain\Entity;

enum RoleName: string
{
    case ADMIN  = 'ADMIN';
    case MEMBER = 'MEMBER';
    case TRIAL  = 'TRIAL';

    public function toString(): string
    {
        return $this->value;
    }
}
