<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Transaction extends Model
{
    use HasFactory;

    protected $fillable = [
        'transfer_type',
        'transfer_id',
        'amount',
        'status',
        'to_account',
        'from_account',
        'elixir',
        'title',
        'transaction_ip',
        'currency',
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function from_account(): BelongsTo
    {
        return $this->belongsTo(Account::class, 'from_account', 'account_number');
    }

    public function to_account()
    {
        return $this->belongsTo(Account::class, 'to_account', 'account_number');
    }

    public function transfer()
    {
        return $this->morphTo();
    }
}
