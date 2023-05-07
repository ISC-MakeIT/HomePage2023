<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class RepositoryProvider extends ServiceProvider
{
    private array $repositories = [
        \MakeIT\Member\Repository\MemberRepository::class => \MakeIT\Member\Repository\Interface\MemberRepository::class,
        \MakeIT\Role\Repository\RoleRepository::class     => \MakeIT\Role\Repository\Interface\RoleRepository::class,
    ];

    public function register(): void
    {
        foreach ($this->repositories as $repository => $impl) {
            $this->app->bind($repository, $impl);
        }
    }
}
