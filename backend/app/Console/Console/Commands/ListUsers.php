<?php

namespace App\Console\Console\Commands;

use App\Http\Controllers\Auth\Models\User;
use Illuminate\Console\Command;

class ListUsers extends Command
{
    protected $signature = 'user:list';

    protected $description = 'List all users';

    public function handle(): void
    {
        $users = User::all();

        $this->table(
            ['ID', 'Full Name', 'Email', 'Email Verified At', 'Password'],
            $users->map(function (User $user) {
                return [
                    $user->id,
                    "{$user->first_name} {$user->last_name}",
                    $user->email,
                    $user->email_verified_at,
                    $user->password,
                ];
            })
        );
    }
}
