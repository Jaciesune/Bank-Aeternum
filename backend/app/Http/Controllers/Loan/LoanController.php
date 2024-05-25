<?php

namespace App\Http\Controllers\Loan;

use App\Models\Loan;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use App\Http\Resources\Loans\LoanResource;
use Illuminate\Http\Request;
use App\Actions\Loans\CreateLoan;


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

    public function create(Request $request, CreateLoan $createLoan)
    {
        $amount = $request->input('amount');
        $duration = $request->input('duration');
        $installment_type = $request->input('installment_type');
        $down_payment = $request->input('down_payment');
        $interest_rate = 9.9; // Stała wartość oprocentowania
        $status = 'unpaid';

        $loanAmount = $amount - $down_payment;
        $installment = $this->calculateMonthlyRate(
            $loanAmount,
            $duration,
            $installment_type
        );

        $loan = $createLoan->__invoke(
            $amount,
            $duration,
            $installment_type,
            $down_payment,
            $interest_rate,
            $status,
            $installment
        );

        return response()->json($loan, 201);
    }
    private function calculateMonthlyRate($amount, $duration, $installment_type)
    {
        $monthlyInterestRate = 9.9 / 100 / 12;
        if ($installment_type === "Raty równe") {
            return round(
                ($amount * $monthlyInterestRate) /
                    (1 - pow(1 + $monthlyInterestRate, -$duration)),
                2
            );
        }
        return round($amount / $duration + $amount * $monthlyInterestRate, 2);
    }
}
