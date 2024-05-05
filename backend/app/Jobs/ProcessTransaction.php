<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;
use App\Models\Transaction;
use Illuminate\Support\Facades\DB;
use RuntimeException;

class ProcessTransaction implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public Transaction $transaction;
    
    /**
     * Create a new job instance.
     */
    public function __construct(Transaction $transaction)
    {
        if($transaction->status != "pending") {
            throw new RuntimeException("Can only process pending transactions");
        } 
        $this->transaction = $transaction;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        DB::transaction(function() {
            $from = $this->transaction->from_account()->get()[0];
            $to = $this->transaction->to_account()->get()[0];
            if(!$from || !$to ) {
                $this->transaction->status = "failed";
                $this->transaction->save();

                return;
            }
            $from->balance -= $this->transaction->amount;
            $to->balance += $this->transaction->amount;

            if($from->balance < 0 || $to->balance < 0) {
                $this->transaction->status = "failed";
                $this->transaction->save();
            } else {
                $this->transaction->status = "completed";
                $from->save();
                $to->save();
                $this->transaction->save();
            }
        });
    }
}
