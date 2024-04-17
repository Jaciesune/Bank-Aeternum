<?php

namespace App\Console\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;

class ListUsers extends Command
{
    protected $signature = 'user:list';

    protected $description = 'List all users';

    public function handle(): void
    {
        $users = User::all();

        $this->table(
            ['ID', 'CID', 'Full Name', 'Email', 'Email Verified At'],
            $users->map(function (User $user) {
                return [
                    $user->id,
                    $user->client_id,
                    "{$user->first_name} {$user->last_name}",
                    $user->email,
                    $user->email_verified_at,
                ];
            })
        );
    }
}
