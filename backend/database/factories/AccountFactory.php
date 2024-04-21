<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

use App\Services\AccountNumberGenerator;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Account>
 */
class AccountFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $account_number = AccountNumberGenerator::generate();

        return [
            'name' => $this->faker->company . "'s Account",
            'account_number' => $account_number,
            'balance' => $this->faker->randomFloat(2, 0, 10000),
            'currency' => $this->faker->currencyCode,
        ];
    }
}
