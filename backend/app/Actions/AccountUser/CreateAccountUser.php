<?php

namespace App\Actions\AccountUser;

use App\Models\AccountUser;

class CreateAccountUser
{
    public function __invoke($account_id, $user_id): AccountUser
    {
        $accountUser = AccountUser::create([
            'account_id' => $account_id,
            'user_id' => $user_id,
        ]);

        return $accountUser;
    }
}
