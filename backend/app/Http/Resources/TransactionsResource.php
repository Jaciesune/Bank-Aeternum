<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TransactionsResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'amount' => $this->amount,
            'currency' => $this->currency,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'account_id' => $this->account_id,
            'type' => $this->transfer->transfer_type(),
            'status' => $this->status,
            'title' => $this->title,
            'reference' => $this->reference,
            'user_id' => $this->user_id,
            'from_account' => $this->from_account,
            'to_account' => $this->to_account,
        ];
    }
}
