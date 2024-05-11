<?php

namespace App\Providers;

use App\Services\CurrencyExchange;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Support\ServiceProvider;

class CurrencyExchangeProvider extends ServiceProvider
{
    /**
     * Bootstrap services.
     */
    public function register(): void
    {
        $this->app->singleton(CurrencyExchange::class, fn () => new CurrencyExchange());
    }
}
