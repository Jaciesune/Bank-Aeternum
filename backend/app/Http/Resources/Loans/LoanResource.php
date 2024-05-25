<?php

namespace App\Http\Resources\Loans;

use App\Models\Loan;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

use Illuminate\Support\Facades\App;

/**
 * @mixin Loans
 */
class LoanResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'user_id' => $this->user_id,
            'amount' => $this->amount,
            'interest_rate' => $this->interest_rate,
            'duration' => $this->duration,
            'status' => $this->status,
            'created_at' => $this->created_at,
            'installment' => $this->installment
        ];
    }
}
