<?php

namespace App\Http\Controllers\Account;

use App\Http\Controllers\Controller;
use App\Http\Resources\Accounts\AccountResource;
use App\Http\Resources\TransactionsResource;
use App\Models\Account;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use App\Http\Requests\Users\TransactionRequest;
use App\Services\CurrencyExchange;

class AccountController extends Controller

{
    public function show($account_id): AccountResource
    {
        return new AccountResource(Account::find($account_id));
    }

    public function index(CurrencyExchange $exchange)
    {
        $accounts = Auth::user()->accounts;
        return AccountResource::collection($accounts);
    }

    public function transactions($account_id, TransactionRequest $request)
    {
        $limit = $request->query('limit', 10);
        $account = Account::findOrFail($account_id);
        $transactions = $account->transactions()->sortByDesc('created_at')->take($limit);
        return TransactionsResource::collection($transactions);
    }
}
