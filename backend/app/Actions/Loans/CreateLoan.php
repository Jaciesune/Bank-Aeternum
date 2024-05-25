<?php

namespace App\Actions\Loans;

use App\Models\Loan;
use Illuminate\Support\Facades\Auth;

class CreateLoan
{
    public function __invoke(
        $amount,
        $duration,
        $installment_type,
        $down_payment,
        $interest_rate,
        $status,
        $installment
    ) {
        $loan = new Loan();
        $loan->amount = $amount;
        $loan->duration = $duration;
        $loan->installment_type = $installment_type;
        $loan->down_payment = $down_payment;
        $loan->interest_rate = $interest_rate;
        $loan->status = $status;
        $loan->installment = $installment;
        $loan->user_id = Auth::id();
        $loan->save();

        return $loan;
    }
}
