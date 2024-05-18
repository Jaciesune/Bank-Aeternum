<?php

namespace App\Jobs;

use App\Models\OwnTransfer;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;
use App\Models\Transaction;
use App\Services\CurrencyExchange;
use Illuminate\Support\Facades\DB;
use Exception;
use RuntimeException;

class TransactionProcessingLogicErrors extends Exception
{
}

class ProcessTransaction implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public Transaction $transaction;

    /**
     * Create a new job instance.
     */
    public function __construct(Transaction $transaction)
    {
        if ($transaction->status != "pending") {
            throw new RuntimeException("Can only process pending transactions");
        }
        $this->transaction = $transaction;
    }

    /**
     * Execute the job.
     */
    public function handle(CurrencyExchange $exchange): void
    {
        try {
            $this->process_trasaction($exchange);
            $this->transaction->status = "completed";
        } catch (Exception $exception) {
            $transaction = $this->transaction->id;
            Log::debug("Transaction $transaction failed: $exception");
            $this->transaction->status = "failed";
            if(!($exception instanceof TransactionProcessingLogicErrors));
        } finally {
            $this->transaction->save();
        }
    }

    private function process_trasaction(CurrencyExchange $exchange)
    {
        DB::transaction(function () use ($exchange) {
            $from = $this->transaction->from_account()->get()->get(0, false);
            if (!$from) {
                throw new TransactionProcessingLogicErrors("Source account does not exist");
            }

            $to = $this->transaction->to_account()->get()->get(0, false);
            if ($to) {
                $to_amount = $exchange->exchange($this->transaction->amount, $from->currency, $to->currency);
                $to->balance += $to_amount;
            }

            $from->balance -= $this->transaction->amount;
            if ($from->balance < 0) {
                throw new TransactionProcessingLogicErrors("Not enough money for this transfer");
            }

            $transfer = $this->transaction->transfer();
            if ($transfer instanceof OwnTransfer) {
                if (!$to)
                    throw new TransactionProcessingLogicErrors("Target account does not exist");
            }

            $from->save();
            if ($to) $to->save();
        });
    }
}
