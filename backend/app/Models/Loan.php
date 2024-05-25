<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Loan extends Model
{
    use HasFactory;


    protected $fillable = [
        'user_id',
        'amount',
        'duration',
        'installment',
        'status',
        'created_at',
        'updated_at',
        'interest_rate',
        'installment_id',
        'loan_amount',
        'installment_type',
        'down_payment',
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function get()
    {
        return $this->all();
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
