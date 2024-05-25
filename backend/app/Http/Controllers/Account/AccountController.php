<?php

namespace App\Http\Controllers\Account;

use App\Http\Controllers\Controller;
use App\Http\Resources\Accounts\AccountResource;
use App\Models\Account;
use App\Models\AccountUser;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Actions\Accounts\CreateAccount;
use App\Services\AccountNumberGenerator;
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

    public function create(Request $request, CreateAccount $createAccount)
    {
        $name = $request->input('name');
        $type = $request->input('type');

        $user = Auth::user();

        // Create the account
        $account = Account::create([
            'name' => $name,
            'balance' => 0,
            'account_number' => AccountNumberGenerator::generate(),
            'currency' => 'PLN',
            'type' => $type,
        ]);

        // Link the account with the user
        AccountUser::create([
            'account_id' => $account->id,
            'user_id' => $user->id,
        ]);

        return new AccountResource($account);
    }
}