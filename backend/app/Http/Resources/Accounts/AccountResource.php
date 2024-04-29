<?php

namespace App\Http\Resources\Accounts;

use App\Models\Account;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin Account
 */
class AccountResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'name' => $this->name,
            'users' => $this->users,
            'balance' => $this->balance,
            'currency' => $this->currency,
        ];
    }
}
