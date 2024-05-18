<?php

namespace Database\Seeders;

use App\Models\Address;
use App\Models\User;
use App\Models\Account;
use App\Models\AccountUser;
use App\Models\Transaction;
use App\Models\Notification;
use App\Models\Loan;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public const DEVELOPER_EMAIL = 'developer@example.com';
    public const DEVELOPER_PASSWORD = 'password';

    public function run(): void
    {
        // Admin
        $adminAddress = Address::factory()->create();
        $adminUser = User::factory()->create([
            'first_name' => 'Developer',
            'last_name' => 'Koper',
            'email' => self::DEVELOPER_EMAIL,
            'email_verified_at' => now(),
            'password' => bcrypt(env('PASSWORD_SALT', '') . self::DEVELOPER_PASSWORD),
            'address_id' => $adminAddress->id,
        ]);

        Notification::factory()->count(7)->create(['user_id' => $adminUser->id]);

        for ($i = 0; $i < 5; $i++) {
            $account = Account::factory()->create();
            AccountUser::factory()->create([
                'account_id' => $account->id,
                'user_id' => $adminUser->id,
            ]);

            $transactions = Transaction::factory()->count(25)->create();
            foreach ($transactions as $transaction) {
                $transaction->from_account()->associate($account);
                $transaction->save();
            }

            $loans = Loan::factory()->count(5)->create();
            foreach ($loans as $loan) {
                $loan->user()->associate($account->id);
                $loan->save();
            }
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

            Notification::factory()->count(5)->create(['user_id' => $user->id]);

            $loans = Loan::factory()->count(5)->create();
            foreach ($loans as $loan) {
                $loan->user()->associate($account->id);
                $loan->save();
            }
        }
    }
}
