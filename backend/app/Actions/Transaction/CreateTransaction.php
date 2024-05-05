<?php

namespace App\Actions\Transaction;

use App\Models\DomesticTransfer;
use App\Models\ForeignTransfer;
use App\Models\Transaction;
use App\Jobs\ProcessTransaction;
use Illuminate\Support\Facades\Log;


class CreateTransaction
{
    public function __invoke(
        string $sender_account_id,
        string $receiver_account_id,
        string $title,
        string $req_ip,
        float $amount,
        string $country,
        string $name
    ): void {
        $transaction = new Transaction([
            'from_account' => $sender_account_id,
            'to_account' => $receiver_account_id,
            'title' => $title,
            'amount' => $amount,
            'elixir' => '0',
            'status' => 'pending',
            'currency' => 'usd',
            'transaction_ip' => $req_ip,
        ]);
        Log::Debug($name);
        if($name == 'domestic') {
            $transaction->transfer()->associate(DomesticTransfer::create([]));
        }else if($name == 'foreign') {
            $transaction->transfer()->associate(ForeignTransfer::create([
                'country' => $country
            ]));
        }
        $transaction->save();
        ProcessTransaction::dispatch($transaction);
    }
}