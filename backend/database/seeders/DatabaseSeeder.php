<?php

namespace Database\Seeders;

use App\Models\Address;
use App\Models\User;
use App\Models\Account;
use App\Models\AccountUser;
use App\Models\Transaction; // Add this line
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public const DEVELOPER_EMAIL = 'developer@example.com';
    public const DEVELOPER_PASSWORD = 'password';

    public function run(): void
    {
        // Default user
        $adminAddress = Address::factory()->create();
        $adminUser = User::factory()->create([
            'first_name' => 'Developer',
            'last_name' => 'Koper',
            'email' => self::DEVELOPER_EMAIL,
            'email_verified_at' => now(),
            'password' => bcrypt(env('PASSWORD_SALT', '') . self::DEVELOPER_PASSWORD),
            'address_id' => $adminAddress->id,
        ]);
        $account = Account::factory()->create([
            'balance' => 2137.69,
        ]);
        AccountUser::factory()->create([
            'account_id' => $account->id,
            'user_id' => $adminUser->id,
        ]);
        $transactions = Transaction::factory()->count(25)->create();
        foreach ($transactions as $transaction) {
            $transaction->from_account()->associate($account->id);
            $transaction->save();
        }

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
            $transactions = Transaction::factory()->count(25)->create();
            foreach ($transactions as $transaction) {
                $transaction->from_account()->associate($account->id);
                $transaction->save();
            }
        }
    }
}
