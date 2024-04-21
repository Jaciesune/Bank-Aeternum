<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Address extends Model
{
    use HasFactory;

    protected $fillable = [
        'street',
        'house_number',
        'apartment_number',
        'postal_code',
        'city',
        'country',
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function getFullAddressAttribute()
    {
        return "{$this->street} {$this->house_number}" . ($this->apartment_number ? "/{$this->apartment_number}" : '') . ", {$this->postal_code} {$this->city}, {$this->country}";
    }
}
