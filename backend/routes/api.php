<?php

use App\Http\Controllers\Users\UserController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Account\AccountController;
use App\Http\Controllers\Transaction\TransactionController;

require __DIR__ . '/auth.php';

Route::middleware('auth:api')->group(function () {
    Route::get('/user', [UserController::class, 'show'])
        ->name('user.show');

    Route::get('/user/accounts', [UserController::class, 'accounts'])
        ->name('user.accounts');

    Route::get('/account', [AccountController::class, 'index'])
        ->name('account.index');

    Route::get('/account/{Accountid}/transactions', [AccountController::class, 'transactions'])
        ->name('account.transactions');

    Route::post('transfer', [TransactionController::class, 'create'])
        ->name('transfer');
});

Route::middleware(['auth:api', 'verified'])->group(function () {
    Route::patch('/user', [UserController::class, 'update'])
        ->name('user.update');

    Route::patch('/user/change-password', [UserController::class, 'changePassword'])
        ->name('user.change-password');

});
