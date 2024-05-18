<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TicketTransfer extends Model
{
    use HasFactory;

    public function transaction()
    {
        return $this->morphOne(Transaction::class, 'transfer');
    }

    public function transfer_type() {
        return "ticket";
    }
}
