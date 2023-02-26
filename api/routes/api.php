<?php

use App\Http\Controllers\Member\AdminMemberController;
use App\Http\Controllers\Notification\AdminNotificationController;
use App\Http\Controllers\Work\AdminWorkController;
use Illuminate\Support\Facades\Route;

Route::prefix('/admin')->group(function () {
    Route::middleware('auth:sanctum')->group(function () {
        Route::prefix('/members')->group(function () {
            Route::post('/', [AdminMemberController::class, 'register']);

            Route::get('/roles', [AdminMemberController::class, 'roles']);
        });
        Route::prefix('/notifications')->group(function () {
            Route::post('/', [AdminNotificationController::class, 'register']);
            Route::put('/', [AdminNotificationController::class, 'edit']);
        });
        Route::prefix('/works')->group(function () {
            Route::post('/', [AdminWorkController::class, 'register']);
        });

        Route::post('/logout', [AdminMemberController::class, 'logout'])->name('logout');
    });

    Route::post('/login', [AdminMemberController::class, 'login'])->name('login');
});
