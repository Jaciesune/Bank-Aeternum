<?php

namespace App\Http\Controllers\Auth;

use App\Actions\Users\CreateUser;
use App\Actions\Addresses\CreateAddress;
use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;
use App\Http\Resources\Users\UserResource;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function register(RegisterRequest $request, CreateUser $createUser): JsonResponse
    {
        $createUser(
            first_name: $request->input('first_name'),
            last_name: $request->input('last_name'),
            email: $request->input('email'),
            password: $request->input('password'),
            phone: $request->input('phone'),
            birth_date: $request->input('birth_date'),
            pesel: $request->input('pesel'),
            gender: $request->input('gender'),
            street: $request->input('street'),
            city: $request->input('city'),
            postal_code: $request->input('postal_code'),
            country: $request->input('country'),
            house_number: $request->input('house_number'),
            apartment_number: $request->input('apartment_number'),
        );

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

        return response()->json([
            'user'         => new UserResource(Auth::user()),
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
