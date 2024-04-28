<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Loan extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
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
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];
    
    public function user()
    {
        return $this->belongsTo(User::class);
    }

}
