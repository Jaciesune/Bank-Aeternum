<?php

namespace App\Http\Controllers\Account;

use App\Http\Controllers\Controller;
use App\Http\Resources\Accounts\AccountResource;
use App\Models\Account;
use App\Models\AccountUser;
use Illuminate\Support\Facades\Auth;

class AccountController extends Controller

{
    public function show($Accountid): AccountResource
    {
        return new AccountResource(Account::find($Accountid));
    }

    public function index(): AccountResource
    {
        $user = Auth::user();
        return new AccountResource($user->accounts[0]);
    }
}
