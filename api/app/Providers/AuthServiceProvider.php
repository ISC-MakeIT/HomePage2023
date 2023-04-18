<?php

namespace App\Providers;

// use Illuminate\Support\Facades\Gate;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider {
    protected $policies = [
        App\Models\Member\Member::class             => App\Policies\MemberPolicy::class,
        App\Models\Notification\Notification::class => App\Policies\NotificationPolicy::class,
        App\Models\Notification\Work::class         => App\Policies\WorkPolicy::class,
        App\Models\OGP\OGP::class                   => App\Policies\OGPPolicy::class,
    ];

    public function boot(): void {
        $this->registerPolicies();
    }
}
