<?php

namespace App\Http\Controllers\Users;

use App\Actions\Users\ChangePassword;
use App\Actions\Users\UpdateUser;
use App\Http\Controllers\Controller;
use App\Http\Requests\Users\ChangePasswordRequest;
use App\Http\Requests\Users\UpdateUserRequest;
use App\Http\Resources\Users\UserResource;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function show(): UserResource
    {
        return new UserResource(Auth::user());
    }

    public function update(UpdateUserRequest $request, UpdateUser $updateUser): UserResource
    {
        $updateUser(
            user: $request->user(),
            first_name: $request->input('first_name'),
            last_name: $request->input('last_name'),
            email: $request->input('email'),
            pesel: $request->input('pesel'),
            phone: $request->input('phone'),
        );

        return new UserResource(Auth::user());
    }

    public function changePassword(ChangePasswordRequest $request, ChangePassword $changePassword): JsonResponse
    {
        $changePassword(
            user: $request->user(),
            password: $request->input('password')
        );

        return response()->json([
            'status' => 'password-changed',
        ]);
    }
}
