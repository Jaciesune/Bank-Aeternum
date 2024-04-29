<?php

namespace App\Console\Console\Commands;

use App\Models\Account;
use Illuminate\Console\Command;

class ChangeValueAccount extends Command
{
    protected $signature = 'accounts:update {id} {balance}';

    protected $description = 'change balance';

    public function handle(): void
    {
        $id = (int)$this->argument("id");
        $balance = (int)$this->argument("balance");
        $account = Account::find($id);

        $account->balance = $balance;
        $account->save();
    }
}
