<?php

namespace MakeIT\Role\Domain\Entity\Admin;

use Illuminate\Support\Collection;
use MakeIT\Role\Domain\Entity\Admin\Role;
use MakeIT\Role\Domain\Bean\Admin\RoleBean;

class RoleList
{
    /** @var array<Role> */
    private array $value;

    /**
     * @param array<Role> $value
     */
    private function __construct(array $value)
    {
        $this->value = $value;
    }

    /**
     * @return array<Role> $value
     */
    public function value(): array
    {
        return $this->value;
    }

    public function isEmpty(): bool
    {
        return count($this->value) === 0;
    }

    /**
     * @param array<RoleBean> $roleBeanList
     */
    public static function fromBean(array $roleBeanList): self
    {
        return new self(
            Collection::make($roleBeanList)
                ->map(
                    fn (RoleBean $roleBean) =>
                        Role::fromBean($roleBean)
                )
                ->toArray()
        );
    }
}
