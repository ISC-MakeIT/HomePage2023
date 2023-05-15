<?php

namespace MakeIT\Role\Domain\Bean\Admin;

class RoleBean
{
    private int $roleId;
    private string $name;

    private function __construct(int $roleId, string $name)
    {
        $this->roleId = $roleId;
        $this->name   = $name;
    }

    public function getRoleId(): int
    {
        return $this->roleId;
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function toJson(): array
    {
        return [
            'roleId' => $this->getRoleId(),
            'name'   => $this->getName(),
        ];
    }

    public static function from(int $roleId, string $name): self
    {
        return new self(
            $roleId,
            $name,
        );
    }
}
