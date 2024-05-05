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
        $user = Auth::user()->accounts[0];
        $sender_account_id = $request->input('sender_account_id');
        if($user == $sender_account_id)
        {
        $createTransaction(
            sender_account_id: $request->input('sender_account_id'),
            receiver_account_id: $request->input('receiver_account_id'),
            title: $request->input('title'),
            amount: $request->input('amount'),
            req_ip: $request->ip(),
            country: $request->input('country'),
            name: $request->input('name')    
        );
        

        return response()->json([
            'status' => 'transaction-created',
        ]);
        }else{
            return response()->json([
                'status' => 'transaction-invalid-sender-account-number'
            ],400);
        }
    }

}

