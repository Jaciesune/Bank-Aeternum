<?php

namespace App\Actions\Users;

use App\Http\Controllers\Auth\Models\User;
use Illuminate\Support\Facades\Hash;

class ChangePassword
{
    public function __invoke(
        User $user,
        string $password,
    ): void {
        $salt = env('PASSWORD_SALT', '');

        $user->update([
            'password' => Hash::make($salt . $password),
        ]);
    }
}
