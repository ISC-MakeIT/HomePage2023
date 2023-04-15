<?php

namespace App\Providers;

use Aws\Ses\SesClient;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider {
    public function register(): void {
        $this->app->bind(SesClient::class, function () {
            return new SesClient([
                'version' => '2010-12-01',
                'region'  => 'ap-northeast-1',
                'retries' => [
                    'mode'         => 'standard',
                    'max_attempts' => 5,
                ],
            ]);
        });
    }

    public function boot(): void {
    }
}
