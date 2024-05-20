<?php

namespace App\Http\Controllers\Transaction;

use App\Actions\Transaction\CreateTransaction;
use App\Http\Controllers\Controller;
use App\Http\Resources\Transactions\TransactionResource;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Models\Account;

class TransactionController extends Controller
{
    public function index($account_id, Request $request)
    {
        $limit = $request->query('limit', 10);
        $account = Account::findOrFail($account_id);
        $transactions = $account->transactions()
            ->orderByDesc('created_at')
            ->take($limit)
            ->get();

        return TransactionResource::collection($transactions);
    }

    public function create(Request $request, CreateTransaction $createTransaction): JsonResponse
    {
        $name = $request->input('name');
        $country = $request->input('country') ?? "";
        $title = $request->input('title') ?? "";

        if (
            $name === 'domestic' || $name === 'own' || $name === "tax" || $name === "ticket"
        ) {
            $country = 'tmp';
        }

        if ($name === 'tax' || $name === 'ticket') {
            $title = 'tmp';
        }

        $createTransaction(
            to_account: $request->input('to_account'),
            from_account: $request->input('from_account'),
            title: $title,
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
