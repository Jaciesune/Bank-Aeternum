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
    ): void {
        $user->fill([
            'first_name' => $first_name,
            'last_name' => $last_name,
            'email' => $email,
        ]);

        if ($user->isDirty('email')) {
            $user->email_verified_at = null;
            $user->sendEmailVerificationNotification();
        }

        $user->save();
    }
}
