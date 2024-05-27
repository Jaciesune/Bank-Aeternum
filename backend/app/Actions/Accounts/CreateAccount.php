<?php

namespace App\Actions\Accounts;

use App\Models\Account;
use App\Actions\AccountUser\CreateAccountUser;

class CreateAccount
{
    public function __invoke(
        string $name,
        string $account_number,
        string $balance,
        string $currency,
        string $type,
        int $user_id
    ): Account {
        $account = Account::create([
            'name' => $name,
            'account_number' => $account_number,
            'balance' => $balance,
            'currency' => $currency,
            'type' => $type,
        ]);

        $createAccountUser = new CreateAccountUser();
        $createAccountUser($account->id, $user_id);

        return $account;
    }
}
