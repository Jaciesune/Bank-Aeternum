<?php

namespace Database\Factories;

use App\Models\Account;
use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\DomesticTransfer;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Transaction>
 */
class TransactionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $notable = $this->faker->randomElement([DomesticTransfer::class]);

        return [
            'amount' => $this->faker->randomFloat(2, 0, 10000),
            'title' => $this->faker->sentence(),
            'status' => $this->faker->randomElement(['pending', 'completed', 'failed']),
            'transfer_type' => $notable,
            'transfer_id' => $notable::factory(),
            'to_account' => $this->faker->iban,
            'from_account' => $this->faker->iban,
            'elixir' => $this->faker->randomFloat(2, 0, 10000),
            'transaction_ip' => $this->faker->ipv4,
            'currency' => $this->faker->randomElement(['USD', 'EUR', 'GBP', 'PLN']),
        ];
    }
}
