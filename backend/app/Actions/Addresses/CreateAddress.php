<?php

namespace App\Actions\Addresses;

use App\Models\Address;

class CreateAddress
{
    public function __invoke(
        string $street,
        string $house_number,
        string $apartment_number,
        string $postal_code,
        string $city,
        string $country
    ): Address {
        $address = Address::create([
            'street' => $street,
            'house_number' => $house_number,
            'apartment_number' => $apartment_number,
            'postal_code' => $postal_code,
            'city' => $city,
            'country' => $country,
        ]);

        return $address;
    }
}
