<?php

namespace App\Http\Resources\Users;

use App\Http\Controllers\Auth\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin User
 */
class UserResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'name' => "{$this->first_name} {$this->last_name}",
            'email' => $this->email,
            'email_verified_at' => $this->email_verified_at,
        ];
    }
}
