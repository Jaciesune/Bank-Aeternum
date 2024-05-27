<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;
use App\Http\Resources\Users\UserResource;
use App\Http\Controllers\Controller;
use App\Http\Resources\Addressess\AddressResource;

use App\Actions\Users\CreateUser;
use App\Actions\Addresses\CreateAddress;
use App\Actions\Accounts\CreateAccount;
use App\Actions\AccountUser\CreateAccountUser;

use App\Models\Address;

use App\Services\AccountNumberGenerator;

class AuthController extends Controller
{
    public function register(RegisterRequest $request, CreateUser $createUser, CreateAddress $createAddress, CreateAccount $createAccount, CreateAccountUser $createAccountUser): JsonResponse
    {
        $address = $createAddress(
            street: $request->input('street'),
            city: $request->input('city'),
            postal_code: $request->input('postal_code'),
            country: $request->input('country'),
            house_number: $request->input('house_number'),
            apartment_number: $request->input('apartment_number'),
        );

        $user = $createUser(
            first_name: $request->input('first_name'),
            last_name: $request->input('last_name'),
            email: $request->input('email'),
            password: $request->input('password'),
            phone: $request->input('phone'),
            birth_date: $request->input('birth_date'),
            pesel: $request->input('pesel'),
            gender: $request->input('gender'),
            address_id: $address->id,
        );

        $account_number = AccountNumberGenerator::generate();
        $account = $createAccount(
            name: "Moje Konto",
            account_number: $account_number,
            balance: 0,
            currency: 'PLN',
            type: 'personal',
            user_id: $user->id,
        );

        // $createAccountUser(
        //     account_id: $account->id,
        //     user_id: $user->id,
        // );

        return response()->json([
            'status' => 'user-created',
        ]);
    }

    public function login(LoginRequest $request): JsonResponse
    {
        $salt = env('PASSWORD_SALT', '');
        $credentials = [
            'email'    => $request->input('email'),
            'password' => $salt . $request->input('password'),
        ];

        $token = Auth::attempt($credentials);

        if (!$token) {
            return response()->json([
                'status' => 'invalid-credentials',
            ], 401);
        }

        $user = Auth::user();


        return response()->json([
            'user'         => new UserResource($user),
            'access_token' => $token,
        ]);
    }

    public function logout(): Response
    {
        Auth::logout();

        return response()->noContent();
    }

    public function refresh(): JsonResponse
    {
        $token = Auth::refresh();

        return response()->json([
            'access_token' => $token,
        ]);
    }
}
