<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ForeignTransfer extends Model
{
    use HasFactory;

    protected $fillable = [
        'country'
    ];

    public function transaction()
    {
        return $this->morphOne(Transaction::class, 'transfer');
    }

    public function transfer_type() {
        return "foreign";
    }
}
