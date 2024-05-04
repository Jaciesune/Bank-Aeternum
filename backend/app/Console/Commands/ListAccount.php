<?php

namespace App\Console\Commands;

use App\Models\Account;
use Illuminate\Console\Command;

class ListAccount extends Command
{
    protected $signature = 'accounts:list';

    protected $description = 'List all accounts';

    public function handle(): void
    {
        $account = Account::all();

        $this->table(
            ['ID', 'Name', 'Account Number', 'Balance', 'Currency'],
            $account->map(function (Account $account) {
                return [
                    $account->id,
                    $account->name,
                    $account->account_number,
                    $account->balance,
                    $account->currency,
                ];
            })
        );
    }
}
