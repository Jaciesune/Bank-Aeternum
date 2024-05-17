<?php

use App\Http\Controllers\Users\UserController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Account\AccountController;
use App\Http\Controllers\Notification\NotificationController;
use App\Http\Controllers\Transaction\TransactionController;

require __DIR__ . '/auth.php';

Route::middleware('auth:api')->group(function () {
    Route::get('/user', [UserController::class, 'show'])
        ->name('user.show');

    Route::get('/account', [AccountController::class, 'index'])
        ->name('account.');

    Route::get('/transactions/{account_id}', [TransactionController::class, 'show'])
        ->name('transactions.show');

    Route::post('transfer', [TransactionController::class, 'create'])
        ->name('transfer');

    Route::get('notification', [NotificationController::class, 'index'])
        ->name('notification');
});

Route::middleware(['auth:api', 'verified'])->group(function () {
    Route::patch('/user', [UserController::class, 'update'])
        ->name('user.update');

    Route::patch('/user/change-password', [UserController::class, 'changePassword'])
        ->name('user.change-password');
});
