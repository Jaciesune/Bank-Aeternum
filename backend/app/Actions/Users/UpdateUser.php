<?php

namespace App\Actions\Users;

use App\Models\User;

class UpdateUser
{
    public function __invoke(
        User $user,
        string $first_name,
        string $last_name,
        string $email,
        string $phone,
        string $pesel,
        string $street,
        string $city,
        string $postal_code,
        string $country,
        string $house_number,
        string $apartment_number
    ): void {
        $user->fill([
            'first_name' => $first_name,
            'last_name' => $last_name,
            'email' => $email,
            'phone' => $phone,
            'pesel' => $pesel,
        ]);

        $user->address->update([
            'street' => $street,
            'city' => $city,
            'postal_code' => $postal_code,
            'country' => $country,
            'house_number' => $house_number,
            'apartment_number' => $apartment_number,
        ]);


        if ($user->isDirty('email')) {
            $user->email_verified_at = null;
            $user->sendEmailVerificationNotification();
        }

        $user->save();
    }
}
