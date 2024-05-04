<?php

namespace App\Http\Requests\Users;

use Illuminate\Foundation\Http\FormRequest;

class TransactionRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'limit' => ['integer', 'min:1', 'max:100'],
        ];
    }
}
