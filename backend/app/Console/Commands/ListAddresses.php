<?php

namespace App\Console\Commands;

use App\Models\User;
use App\Models\Address;
use Illuminate\Console\Command;

class ListAddresses extends Command
{
    protected $signature = 'addresses:list';

    protected $description = 'List all from users';

    public function handle(): void
    {
        $address = Address::all();

        $this->table(
            ['ID', 'Street', 'House Number', 'Apartment Number', 'Postal Code', 'City', 'Country'],
            $address->map(function (Address $address) {
                return [
                    $address->id,
                    $address->street,
                    $address->house_number,
                    $address->apartment_number,
                    $address->postal_code,
                    $address->city,
                    $address->country,
                ];
            })
        );
    }
}
