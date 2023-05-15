<?php

namespace App\Providers;

// use Illuminate\Support\Facades\Gate;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    protected $policies = [
        \MakeIT\Member\Domain\Eloquent\Member::class => \App\Policies\MemberPolicy::class,
        \MakeIT\Role\Domain\Eloquent\Role::class     => \App\Policies\RolePolicy::class,
        \App\Models\Notification\Notification::class => \App\Policies\NotificationPolicy::class,
        \App\Models\Notification\Work::class         => \App\Policies\WorkPolicy::class,
        \App\Models\OGP\OGP::class                   => \App\Policies\OGPPolicy::class,
    ];

    public function boot(): void
    {
        $this->registerPolicies();
    }
}
