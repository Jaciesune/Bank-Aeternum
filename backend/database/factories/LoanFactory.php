<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Loan>
 */
class LoanFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'amount' => $this->faker->randomFloat(2, 0, 10000),
            'interest_rate' => $this->faker->randomFloat(2, 0, 100),
            'duration' => $this->faker->randomDigit,
            'status' => $this->faker->randomElement(['pending', 'completed', 'failed']),
            'user_id' => $this->faker->randomDigit,
            'currency' => $this->faker->randomElement(['USD', 'EUR', 'GBP', 'PLN']),
            'installment' => $this->faker->randomFloat(2, 0, 10000),
            'installment_id' => $this->faker->randomDigit,
            'loan_amount' => $this->faker->randomFloat(2, 0, 10000),
            'installment_type' => $this->faker->randomElement(['daily', 'weekly', 'monthly']),
        ];
    }
}
            
