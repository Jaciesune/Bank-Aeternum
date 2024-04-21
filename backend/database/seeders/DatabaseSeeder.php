<?php

namespace Database\Seeders;

use App\Models\Address;
use App\Models\User;
use App\Models\Account;
use App\Models\AccountUser;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public const DEVELOPER_EMAIL = 'developer@example.com';

    public function run(): void
    {
        // Default user
        $adminAddress = Address::factory()->create();
        $adminUser = User::factory()->create([
            'first_name' => 'Developer',
            'last_name' => 'Example',
            'email' => self::DEVELOPER_EMAIL,
            'email_verified_at' => now(),
            'phone' => '+48123456789',
            'password' => bcrypt(env('PASSWORD_SALT', '') . 'password'),
            'address_id' => $adminAddress->id,
        ]);
        $account = Account::factory()->create([
            'balance' => 2137.69,
        ]);

        // Other users
        $addresses = Address::factory()->count(5)->create();
        foreach ($addresses as $address) {
            $user = User::factory()->create([
                'address_id' => $address->id,
            ]);
            $account = Account::factory()->create();
            AccountUser::factory()->create([
                'account_id' => $account->id,
                'user_id' => $user->id,
            ]);
        }
    }
}
