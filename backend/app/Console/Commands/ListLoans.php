<?php

namespace App\Console\Commands;

use App\Models\Loan;
use Illuminate\Console\Command;

class ListLoans extends Command
{
    protected $signature = 'loans:list';

    protected $description = 'List all loans';

    public function handle(): void
    {
        $n = Loan::all();

        $this->table(
            ['ID', 'User ID', 'Amount', 'Interest', 'Duration', 'Status', 'Created At'],
            $n->map(function (Loan $loan) {
                return [
                    $loan->id,
                    $loan->user_id,
                    $loan->amount,
                    $loan->interest_rate,
                    $loan->duration,
                    $loan->status,
                    $loan->created_at,
                ];
            })
        );
    }
}
