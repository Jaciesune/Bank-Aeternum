<?php

namespace Database\Seeders;

use App\Models\User;
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
            'email_verified_at' => now(),
            'phone' => '+48123456789',
            'birth_date' => '2000-01-01',
            'pesel' => '00010100000',
            'gender' => 'man',
            'created_at' => now(),
            'password_changed_at' => now(),
            'password' => bcrypt(env('PASSWORD_SALT', '') . 'password'),
        ]);
        User::factory()->count(5)->create();
    }
}
