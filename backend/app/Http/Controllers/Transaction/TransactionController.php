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

        if ($name === 'domestic' || $name === 'own') {
            $country = 'domestic_tmp';
        }

        $createTransaction(
            to_account: $request->input('to_account'),
            from_account: $request->input('from_account'),
            // receiver_name: $request->input('receiver_name'),
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
