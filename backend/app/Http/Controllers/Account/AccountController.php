<?php

namespace App\Http\Controllers\Account;

use App\Http\Controllers\Controller;
use App\Http\Resources\Accounts\AccountResource;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Actions\Accounts\CreateAccount;
use App\Services\AccountNumberGenerator;
use App\Services\CurrencyExchange;
use Illuminate\Support\Facades\DB;

class AccountController extends Controller
{
    public function show($account_id): AccountResource
    {
        $account = DB::selectOne('SELECT * FROM accounts WHERE id = ?', [$account_id]);
        if (!$account) {
            abort(404, 'Account not found');
        }
        return new AccountResource((object)$account);
    }

    public function index(CurrencyExchange $exchange)
    {
        $userId = Auth::id();
        $accounts = DB::select('
            SELECT accounts.* FROM accounts
            INNER JOIN account_user ON accounts.id = account_user.account_id
            WHERE account_user.user_id = ?', [$userId]);

        return AccountResource::collection(collect($accounts)->map(function ($account) {
            return (object)$account;
        }));
    }

    public function create(Request $request, CreateAccount $createAccount)
    {
        $name = $request->input('name');
        $type = $request->input('type');

        $userId = Auth::id();
        $accountNumber = AccountNumberGenerator::generate();

        // Create the account
        DB::insert('
            INSERT INTO accounts (name, balance, account_number, currency, type, created_at, updated_at)
            VALUES (?, ?, ?, ?, ?, NOW(), NOW())', [
            $name,
            0,
            $accountNumber,
            'PLN',
            $type,
        ]);

        $accountId = DB::getPdo()->lastInsertId();

        // Link the account with the user
        DB::insert('
            INSERT INTO account_user (account_id, user_id, created_at, updated_at)
            VALUES (?, ?, NOW(), NOW())', [
            $accountId,
            $userId,
        ]);

        $account = DB::selectOne('SELECT * FROM accounts WHERE id = ?', [$accountId]);
        return new AccountResource((object)$account);
    }
}
