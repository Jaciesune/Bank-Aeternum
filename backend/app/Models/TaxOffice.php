<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TaxOffice extends Model
{
    use HasFactory;

    protected $fillable = [
        'province',
        'office_code',
        'office_name',
        'street',
        'number',
        'postcode',
        'bank_account_type',
        'bank_account_number'
    ];
}
