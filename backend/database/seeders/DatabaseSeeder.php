<?php

namespace Database\Seeders;

use App\Models\Address;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public const DEVELOPER_EMAIL = 'developer@example.com';

    public function run(): void
    {
        $adminAddress = Address::factory()->create();
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
            'address_id' => $adminAddress->id,
        ]);

        $addresses = Address::factory()->count(5)->create();
        foreach ($addresses as $address) {
            error_log($address);
            User::factory()->create([
                'address_id' => $address->id,
            ]);
        }
    }
}
