<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Account extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'account_number',
        'balance',
        'currency',
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];
    public function sent_transactions()
    {
        return $this->hasMany(Transaction::class, "from_account", "account_number");
    }

    public function recieved_transactions()
    {
        return $this->hasMany(Transaction::class, "to_account", "account_number");
    }

    public function transactions()
    {
        $sent = $this->sent_transactions;
        $recieved = $this->recieved_transactions;

        return $sent->merge($recieved);
    }
}
