<?php

namespace App\Actions\Accounts;

use App\Models\Account;

class CreateAccount
{
    public function __invoke(
        string $name,
        string $account_number,
        string $balance,
        string $currency,
    ): Account {
        $account = Account::create([
            'name' => $name,
            'account_number' => $account_number,
            'balance' => $balance,
            'currency' => $currency,
        ]);

        return $account;
    }
}
