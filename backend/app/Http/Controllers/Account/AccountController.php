<?php

namespace App\Http\Controllers\Account;

use App\Http\Controllers\Controller;
use App\Http\Resources\Accounts\AccountResource;
use App\Http\Resources\TransactionsResource;
use App\Models\Account;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\Users\TransactionRequest;

class AccountController extends Controller

{
    public function show($Accountid): AccountResource
    {
        return new AccountResource(Account::find($Accountid));
    }

    public function index(): AccountResource
    {
        $user = Auth::user()->accounts[0];
        return new AccountResource($user);
    }

    public function transactions($accountId, TransactionRequest $request)
    {
        $limit = $request->query('limit', 10);
        $account = Account::findOrFail($accountId);
        $transactions = $account->transactions()->take($limit);
        return TransactionsResource::collection($transactions);
    }
}
