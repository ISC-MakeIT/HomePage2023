<?php

namespace App\Providers;

use App\Http\Resources\Notification\Admin\NotificationsResource;
use App\Http\Resources\Work\Admin\WorksResource;
use Illuminate\Support\ServiceProvider;

class SettingResourceServiceProvider extends ServiceProvider {
    public function register(): void {
        NotificationsResource::withoutWrapping();
        WorksResource::withoutWrapping();
    }

    public function boot(): void {
    }
}
