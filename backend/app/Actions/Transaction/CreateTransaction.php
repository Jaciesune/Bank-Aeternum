<?php

namespace App\Actions\Transaction;

use App\Models\DomesticTransfer;
use App\Models\OwnTransfer;
use App\Models\ForeignTransfer;
use App\Models\Transaction;
use App\Jobs\ProcessTransaction;
use Illuminate\Support\Facades\Log;

class CreateTransaction
{
    public function __invoke(
        string $to_account,
        string $from_account,
        string $title,
        string $req_ip,
        float $amount,
        string $country,
        string $name
    ): void {
        $transaction = new Transaction([
            'to_account' => $to_account,
            'from_account' => $from_account,
            'title' => $title,
            'amount' => $amount,
            'elixir' => '0',
            'status' => 'pending',
            'currency' => 'usd',
            'transaction_ip' => $req_ip,
        ]);
        Log::Debug($name);
        if ($name == 'domestic') {
            $transaction->transfer()->associate(DomesticTransfer::create([]));
        } else if ($name == 'foreign') {
            $transaction->transfer()->associate(ForeignTransfer::create([
                'country' => $country
            ]));
        } else if ($name == 'own') {
            $transaction->transfer()->associate(OwnTransfer::create([]));
        }
        $transaction->save();
        ProcessTransaction::dispatch($transaction);
    }
}
