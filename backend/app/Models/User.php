<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Tymon\JWTAuth\Contracts\JWTSubject;
use App\Models\logs;

class User extends Authenticatable implements JWTSubject, MustVerifyEmail
{
    use HasApiTokens;
    use HasFactory;
    use Notifiable;

    protected $fillable = [
        'client_id',
        'first_name',
        'last_name',
        'email',
        'password',
        'phone',
        'birth_date',
        'pesel',
        'gender',
        'address_id',
    ];

    protected $hidden = [
        'client_id',
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'created_at' => 'datetime',
        'password_changed_at' => 'datetime',
        'password'          => 'hashed',
    ];

    public function getJWTIdentifier(): mixed
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims(): array
    {
        return [];
    }

    public function notifications()
    {
        return $this->hasMany(Notification::class);
    }

    public function loans()
    {
        return $this->hasMany(Loan::class);
    }

    public function address()
    {
        return $this->belongsTo(Address::class);
    }

    public function accounts()
    {
        return $this->belongsToMany(Account::class);
    }

    public function logs()
    {
        return $this->hasMany(logs::class);
    }
}
