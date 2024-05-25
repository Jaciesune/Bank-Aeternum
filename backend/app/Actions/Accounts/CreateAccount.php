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
        string $type
    ): Account {
        $account = Account::create([
            'name' => $name,
            'account_number' => $account_number,
            'balance' => $balance,
            'currency' => $currency,
            'type' => $type,
        ]);

        return $account;
    }
}
