<?php

use App\Http\Controllers\Member\AdminMemberController;
use App\Http\Controllers\Notification\AdminNotificationController;
use Illuminate\Support\Facades\Route;

Route::prefix('/admin')->group(function () {
    // Route::middleware('auth:sanctum')->group(function() {
    Route::prefix('/members')->group(function () {
        Route::post('/', [AdminMemberController::class, 'register']);
    });
    Route::prefix('/notifications')->group(function () {
        Route::post('/', [AdminNotificationController::class, 'register']);
    });
    // });
});
