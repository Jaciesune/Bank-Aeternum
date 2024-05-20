<?php

namespace App\Http\Resources\Addressess;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin Address
 */
class AddressResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'street' => $this->street,
            'house_number' => $this->house_number,
            'apartment_number' => $this->apartment_number,
            'postal_code' => $this->postal_code,
            'city' => $this->city,
            'country' => $this->country,
            'full_address' => $this->full_address,
        ];
    }
}
