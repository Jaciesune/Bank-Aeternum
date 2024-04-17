<?php

namespace App\Console\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;

class ListUserAll extends Command
{
    protected $signature = 'user:listall';

    protected $description = 'List all from users';

    public function handle(): void
    {
        $users = User::all();

        $this->table(
            ['ID', 'CID', 'Full Name', 'Email', 'Email Verified At', 'Phone', 'Birth Date', 'PESEL', 'Gender', 'Created At', 'Password Changed At', 'Password'],
            $users->map(function (User $user) {
                return [
                    $user->id,
                    $user->client_id,
                    "{$user->first_name} {$user->last_name}",
                    $user->email,
                    $user->email_verified_at,
                    $user->phone,
                    $user->birth_date,
                    $user->pesel,
                    $user->gender,
                    $user->created_at,
                    $user->password_changed_at,
                    $user->password,
                    
                ];
            })
        );
    }
}
