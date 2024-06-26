<?php

namespace App\Http\Resources\Accounts;

use App\Models\Account;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

use Illuminate\Support\Facades\App;

/**
 * @mixin Account
 */
class AccountResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'balance' => $this->balance,
            'account_number' => $this->account_number,
            'currency' => $this->currency,
            'type' => $this->type,
        ];
    }
}
