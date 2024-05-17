<?php

namespace App\Http\Controllers\Loan;

use App\Models\Loan;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use App\Http\Resources\Loans\LoanResource;


class LoanController extends Controller

{
    public function show($loan_id): LoanResource
    {
        return new LoanResource(Loan::find($loan_id));
    }

    public function index()
    {
        $loans = Auth::user()->loans;
        return LoanResource::collection($loans);
    }

    public function markAsRead($loan_id)
    {
        $loan = Loan::find($loan_id);

        if (!$loan) {
            return response()->json(['error' => 'Loan not found'], 404);
        }

        $loan->markAsRead();

        return response()->json([
            'status' => 'loan-marked-as-read',
        ]);
    }   
}
