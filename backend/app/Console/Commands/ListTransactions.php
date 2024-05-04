<?php

namespace App\Console\Commands;

use App\Models\Transaction;
use Illuminate\Console\Command;

class ListTransactions extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'transaction:list';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $transactions = Transaction::all();

        $this->table(
            ['ID', 'transfer_type', 'amount', 'transfer_id', 'status', 'to_account', 'from_account', 'title'],
            $transactions->map(function (Transaction $transaction) {
                return [
                    $transaction->id,
                    $transaction->transfer_type,
                    $transaction->amount,
                    $transaction->transfer_id,
                    $transaction->status,
                    $transaction->to_account,
                    $transaction->from_account,
                    $transaction->title,
                ];
            })
        );
    }
}
