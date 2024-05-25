<?php

use App\Http\Controllers\Users\UserController;
use App\Http\Controllers\Loan\LoanController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Account\AccountController;
use App\Http\Controllers\Notification\NotificationController;
use App\Http\Controllers\Transaction\TransactionController;
use App\Http\Controllers\TaxOffice\TaxOfficeController;


Route::get("/check", function () {
    return "very ok";
});

require __DIR__ . '/auth.php';
Route::middleware('auth:api')->group(function () {
    Route::get('/user', [UserController::class, 'show'])
        ->name('user.show');

    Route::get('/account', [AccountController::class, 'index'])
        ->name('account');

    Route::post('/account', [AccountController::class, 'create'])
        ->name('account.create');

    Route::get('/transactions/{account_id}', [TransactionController::class, 'index'])
        ->name('transactions');

    Route::post('transfer', [TransactionController::class, 'create'])
        ->name('transfer');

    Route::get('notification', [NotificationController::class, 'index'])
        ->name('notification');

    Route::get('tax-office', [TaxOfficeController::class, 'index'])
        ->name('taxOffice');

    Route::get('loan', [LoanController::class, 'index'])
        ->name('loan');

    Route::post('/loan', [LoanController::class, 'create'])
        ->name('loan.create');
});

Route::middleware(['auth:api', 'verified'])->group(function () {
    Route::patch('/user', [UserController::class, 'update'])
        ->name('user.update');

    Route::patch('/user/change-password', [UserController::class, 'changePassword'])
        ->name('user.change-password');
});
