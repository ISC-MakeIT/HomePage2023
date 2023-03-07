<?php

namespace App\Providers;

use App\Http\Resources\Member\Admin\MembersResource;
use App\Http\Resources\Notification\Admin\NotificationsResource;
use App\Http\Resources\Work\Admin\WorksResource;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\ServiceProvider;

class SettingResourceServiceProvider extends ServiceProvider {
    /** @var JsonResource[] */
    private array $withoutWrappingResources = [
        NotificationsResource::class,
        WorksResource::class,
        MembersResource::class,
    ];

    public function register(): void {
        foreach ($this->withoutWrappingResources as $withoutWrappingResource) {
            $withoutWrappingResource::withoutWrapping();
        }
    }

    public function boot(): void {
    }
}
