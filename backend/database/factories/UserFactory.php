<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Faker\Provider\Uuid;

class UserFactory extends Factory
{
    public function definition(): array
    {
        // Generuje 6-cyfrowy unikalny identyfikator UUID
        $client_id = Uuid::randomNumber(6);
        $salt = env('PASSWORD_SALT', '');

        return [
            'client_id'         => $client_id,
            'first_name'        => $this->faker->firstName(),
            'last_name'         => $this->faker->lastName(),
            'email'             => fake()->unique()->safeEmail(),
            'email_verified_at' => now(),
            'remember_token'    => Str::random(10),
            'phone'             => $this->faker->phoneNumber(),
            'birth_date'        => $this->faker->date(),
            'pesel'             => $this->faker->unique()->numerify('###########'),
            'gender'            => $this->faker->randomElement(['man', 'woman', 'other']),
            'created_at'        => now(),
            'password_changed_at' => now(),
            'password'          => Hash::make($salt . 'password')
        ];
    }

    public function unverified(): static
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }
}
