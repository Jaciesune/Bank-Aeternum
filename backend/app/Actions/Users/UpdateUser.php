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
    ): void {
        $user->fill([
            'first_name' => $first_name,
            'last_name' => $last_name,
            'email' => $email,
            'phone' => $phone,
            'pesel' => $pesel,
            'address->street' => $street,
            'address->city' => $city,
            'address->postal_code' => $postal_code,
            'address->country' => $country,
        ]);

        if ($user->isDirty('email')) {
            $user->email_verified_at = null;
            $user->sendEmailVerificationNotification();
        }

        $user->save();
    }
}
