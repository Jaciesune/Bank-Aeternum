<?php

namespace App\Services;

// TODO Unique account number generator
class AccountNumberGenerator
{
    public static function generate(): string
    {
        $accountNumber = '';
        for ($i = 0; $i < 20; $i++) {
            $accountNumber .= mt_rand(0, 9);
        }

        return $accountNumber;
    }
}
