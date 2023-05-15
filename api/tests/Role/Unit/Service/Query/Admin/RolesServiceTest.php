<?php

namespace Tests\Role\Unit\Service\Query\Admin;

use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Collection;
use MakeIT\Role\Domain\Bean\Admin\RoleBean;
use MakeIT\Role\Domain\Entity\Admin\RoleName;
use MakeIT\Role\Repository\Admin\Interface\RoleRepository;
use MakeIT\Role\Service\Query\Admin\RolesService;
use Mockery;
use Mockery\MockInterface;
use Tests\BaseTestCase;

class RolesServiceTest extends BaseTestCase
{
    public function testロールの一覧取得を行うこと(): void
    {
        $mock = Mockery::mock(RoleRepository::class, function (MockInterface $mock) {
            $mock->shouldReceive('findAll')
                ->once()
                ->andReturn(
                    Collection::make(RoleName::cases())
                        ->map(
                            fn (RoleName $roleName, int $index) =>
                            RoleBean::from($index + 1, $roleName->toString())
                        )
                        ->toArray()
                );
        });
        $rolesService = new RolesService($mock);

        $roles = $rolesService->execute();
        $this->assertCount(count($roles), RoleName::cases());
    }

    public function testロールの一覧取得で要素数が0個だった場合Exceptionが発生すること(): void
    {
        $mock = Mockery::mock(RoleRepository::class, function (MockInterface $mock) {
            $mock->shouldReceive('findAll')
                ->once()
                ->andReturn([]);
        });
        $rolesService = new RolesService($mock);

        $this->expectException(ModelNotFoundException::class);
        $rolesService->execute();
    }
}
