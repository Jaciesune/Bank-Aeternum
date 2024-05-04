<?php

namespace App\Console\Commands;

use App\Models\AccountUser;
use Illuminate\Console\Command;

class ListAccountUser extends Command
{
    protected $signature = 'accountuser:list';

    protected $description = 'List all accounts';

    public function handle(): void
    {
        $account_user = AccountUser::all();

        $this->table(
            ['account_id', 'user_id'],
            $account_user->map(function (AccountUser $account) {
                return [
                    'account_id' => $account->account_id,
                    'user_id' => $account->user_id,
                ];
            })
        );
    }
}
