<?php

namespace App\Actions\Users;

use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Support\Facades\Hash;

/**
 * @OA\Info(
 *     title="Create User",
 *     version="1.0.0",
 *     description="Create a new user",
 * ),
 *
 * @OA\Get(
 *     path="/api/user",
 *     summary="Create a new user",
 *     tags={"Users"},
 *
 *     @OA\RequestBody(
 *         required=true,
 *
 *         @OA\JsonContent(
 *             required={"first_name", "last_name", "email", "password"},
 *
 *             @OA\Property(property="first_name", type="string", example="John"),
 *             @OA\Property(property="last_name", type="string", example="Doe"),
 *             @OA\Property(property="email", type="string", format="email", example="example@example.pl"),
 *             @OA\Property(property="password", type="string", format="password", example="password123"),
 *         )
 *     ),
 *
 *     @OA\Response(
 *         response=201,
 *         description="User created successfully",
 *
 *         @OA\JsonContent(
 *
 *             @OA\Property(property="client_id", type="integer", example="123456"),
 *             @OA\Property(property="first_name", type="string", example="John"),
 *             @OA\Property(property="last_name", type="string", example="Doe"),
 *             @OA\Property(property="email", type="string", format="email", example="example@example.pl"),
 *         )
 *     ),
 *
 *     @OA\Response(
 *         response=422,
 *         description="Validation error",
 *
 *         @OA\JsonContent(
 *
 *             @OA\Property(property="message", type="string", example="The given data was invalid."),
 *             @OA\Property(property="errors", type="object", example={"first_name": {"The first name field is required."}})
 *         )
 *     )
 * )
 */
class CreateUser
{
    public function __invoke(
        string $first_name,
        string $last_name,
        string $email,
        string $password,
        string $phone,
        string $birth_date,
        string $pesel,
        string $gender,
    ): User {

        $client_id = mt_rand(100000, 999999);


        $salt = env('PASSWORD_SALT', '');

        $user = User::create([
            'client_id'  => $client_id,
            'first_name' => $first_name,
            'last_name'  => $last_name,
            'email'      => $email,
            'password'   => Hash::make($salt . $password),
            'phone'      => $phone,
            'birth_date' => $birth_date,
            'pesel'      => $pesel,
            'gender'     => $gender,

        ]);

        event(new Registered($user));

        return $user;
    }
}
