<?php

namespace App\Http\Controllers\Transaction;

use App\Actions\Transaction\CreateTransaction;
use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TransactionController extends Controller

{
    public function create(Request $request, CreateTransaction $createTransaction): JsonResponse
    {
        $name = $request->input('name');
        $country = $request->input('country') ?? null;

        if ($name === 'domestic') {
            $country = 'domestic_tmp';
        }

        $createTransaction(
            sender_account_id: $request->input('sender_account_id'),
            receiver_account_id: $request->input('receiver_account_id'),
            title: $request->input('title'),
            amount: $request->input('amount'),
            req_ip: $request->ip(),
            country: $country,
            name: $name
        );

        return response()->json([
            'status' => 'transaction-created',
        ]);
    }
}
