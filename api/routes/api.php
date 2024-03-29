<?php

use App\Http\Controllers\Contact\ContactController;
use App\Http\Controllers\Member\AdminMemberController;
use App\Http\Controllers\Member\MemberController;
use App\Http\Controllers\Notification\AdminNotificationController;
use App\Http\Controllers\Notification\NotificationController;
use App\Http\Controllers\OGP\AdminOGPController;
use App\Http\Controllers\Work\AdminWorkController;
use App\Http\Controllers\Work\WorkController;
use Illuminate\Support\Facades\Route;

Route::prefix('/admin')->group(function () {
    Route::middleware('auth:sanctum')->group(function () {
        Route::prefix('/members')->group(function () {
            Route::get('/', [AdminMemberController::class, 'members']);
            Route::post('/', [AdminMemberController::class, 'register']);
            Route::put('/', [AdminMemberController::class, 'edit']);
            Route::delete('/', [AdminMemberController::class, 'delete']);
            Route::get('/me', [AdminMemberController::class, 'me']);
            Route::get('/roles', [AdminMemberController::class, 'roles']);
            Route::put('/icon', [AdminMemberController::class, 'editIcon']);
            Route::put('/password', [AdminMemberController::class, 'changePassword']);
            Route::put('/role', [AdminMemberController::class, 'changeRole']);
            Route::put('/active', [AdminMemberController::class, 'changeActive']);
            Route::get('/{memberId}', [AdminMemberController::class, 'member']);
        });
        Route::prefix('/notifications')->group(function () {
            Route::get('/', [AdminNotificationController::class, 'notifications']);
            Route::post('/', [AdminNotificationController::class, 'register']);
            Route::put('/', [AdminNotificationController::class, 'edit']);
            Route::delete('/', [AdminNotificationController::class, 'delete']);
            Route::get('/{notificationId}', [AdminNotificationController::class, 'notification']);
        });
        Route::prefix('/works')->group(function () {
            Route::get('/', [AdminWorkController::class, 'works']);
            Route::post('/', [AdminWorkController::class, 'register']);
            Route::put('/', [AdminWorkController::class, 'edit']);
            Route::delete('/', [AdminWorkController::class, 'delete']);
            Route::get('/{workId}', [AdminWorkController::class, 'work']);
        });
        Route::prefix('/ogps')->group(function () {
            Route::get('/', [AdminOGPController::class, 'OGPList']);
            Route::post('/', [AdminOGPController::class, 'registerOGP']);
            Route::put('/', [AdminOGPController::class, 'editOGP']);
            Route::delete('/', [AdminOGPController::class, 'deleteOGP']);
            Route::get('/detail', [AdminOGPController::class, 'OGP']);
        });
        Route::post('/logout', [AdminMemberController::class, 'logout'])->name('logout');
    });

    Route::post('/login', [AdminMemberController::class, 'login'])->name('login');
});


Route::prefix('/members')->group(function () {
    Route::get('/', [MemberController::class, 'members']);
});
Route::prefix('/works')->group(function () {
    Route::get('/', [WorkController::class, 'works']);
});
Route::prefix('/notifications')->group(function () {
    Route::get('/', [NotificationController::class, 'notifications']);
});
Route::post('/contact', [ContactController::class, 'contact']);
