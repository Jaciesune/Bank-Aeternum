<?php

namespace Database\Seeders;

// TODO Fix import path
use App\Http\Controllers\Auth\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public const DEVELOPER_EMAIL = 'developer@example.com';

    public function run(): void
    {
        User::factory()->create([
            'first_name' => 'Developer',
            'last_name' => 'Example',
            'email' => self::DEVELOPER_EMAIL,
        ]);
    }
}
