<?php

namespace App\Providers;

use App\Http\Resources\Member\Admin\MembersResource as AdminMembersResource;
use App\Http\Resources\Notification\Admin\NotificationsResource as AdminNotificationsResource;
use App\Http\Resources\Work\Admin\WorksResource as AdminWorksResource;
use App\Http\Resources\Member\User\MembersResource as UserMembersResource;
use App\Http\Resources\Notification\User\NotificationsResource as UserNotificationsResource;
use App\Http\Resources\Work\User\WorksResource as UserWorksResource;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\ServiceProvider;

class SettingResourceServiceProvider extends ServiceProvider {
    /** @var JsonResource[] */
    private array $withoutWrappingResources = [
        AdminNotificationsResource::class,
        AdminWorksResource::class,
        AdminMembersResource::class,
        UserWorksResource::class,
        UserMembersResource::class,
        UserNotificationsResource::class,
    ];

    public function register(): void {
        foreach ($this->withoutWrappingResources as $withoutWrappingResource) {
            $withoutWrappingResource::withoutWrapping();
        }
    }

    public function boot(): void {
    }
}
