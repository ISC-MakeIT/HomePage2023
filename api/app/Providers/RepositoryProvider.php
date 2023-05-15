<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class RepositoryProvider extends ServiceProvider
{
    private array $repositories = [
        \MakeIT\Member\Repository\Admin\MemberRepository::class => \MakeIT\Member\Repository\Admin\Interface\MemberRepository::class,
        \MakeIT\Role\Repository\Admin\RoleRepository::class     => \MakeIT\Role\Repository\Admin\Interface\RoleRepository::class,
        \MakeIT\AWS\Repository\S3ImageRepository::class         => \MakeIT\AWS\Repository\Interface\S3ImageRepository::class,
    ];

    private array $repositoriesForTest = [
        \MakeIT\Member\Repository\Admin\MemberRepository::class  => \MakeIT\Member\Repository\Admin\Interface\MemberRepository::class,
        \MakeIT\Role\Repository\Admin\DummyRoleRepository::class => \MakeIT\Role\Repository\Admin\Interface\RoleRepository::class,
        \MakeIT\AWS\Repository\DummyS3ImageRepository::class     => \MakeIT\AWS\Repository\Interface\S3ImageRepository::class,
    ];

    public function register(): void
    {
        if (config('app.env') === 'testing') {
            foreach ($this->repositoriesForTest as $repository => $impl) {
                $this->app->bind($impl, $repository);
            }
            return;
        }

        foreach ($this->repositories as $repository => $impl) {
            $this->app->bind($impl, $repository);
        }
    }
}
