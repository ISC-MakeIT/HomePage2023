<?php

use App\Http\Controllers\Member\AdminMemberController;
use App\Http\Controllers\Notification\AdminNotificationController;
use App\Http\Controllers\Work\AdminWorkController;
use Illuminate\Support\Facades\Route;

Route::prefix('/admin')->group(function () {
    Route::middleware('auth:sanctum')->group(function () {
        Route::prefix('/members')->group(function () {
            Route::post('/', [AdminMemberController::class, 'register']);
            Route::put('/', [AdminMemberController::class, 'edit']);
            Route::get('/roles', [AdminMemberController::class, 'roles']);
            Route::put('/password', [AdminMemberController::class, 'changePassword']);
        });
        Route::prefix('/notifications')->group(function () {
            Route::post('/', [AdminNotificationController::class, 'register']);
            Route::put('/', [AdminNotificationController::class, 'edit']);
            Route::delete('/', [AdminNotificationController::class, 'delete']);
        });
        Route::prefix('/works')->group(function () {
            Route::post('/', [AdminWorkController::class, 'register']);
            Route::put('/', [AdminWorkController::class, 'edit']);
            Route::delete('/', [AdminWorkController::class, 'delete']);
        });
        Route::post('/logout', [AdminMemberController::class, 'logout'])->name('logout');
    });

    Route::post('/login', [AdminMemberController::class, 'login'])->name('login');
});
