<?php

namespace App\Services;

use Exception;
use Illuminate\Support\Facades\Cache;

class CurrencyExchange
{
    private $exchange_rates = [];
    function __construct()
    {
        $this->exchange_rates = Cache::remember('exchanges', 60*60*24, function () {
            $data = json_decode(file_get_contents('https://api.nbp.pl/api/exchangerates/tables/a/last/1'), true);
            if(!$data) {
                throw new Exception("NBP api error");
            }
            $exchange_rates = [];
            foreach ($data[0]["rates"] as $rate)
            {
                $exchange_rates[$rate["code"]] = $rate["mid"];
            }
            // 5 PLNinylle to 5 PLNinylle
            $exchange_rates["PLN"] = 1.0;
    
            return $exchange_rates;
         });
    }
    public function exchange($amount, $sourceCurrency, $toCurrency): string
    {
        $sourceCurrency = strtoupper($sourceCurrency);
        $toCurrency = strtoupper($toCurrency);
        if(!$this->exchange_rates[$sourceCurrency] || !$this->exchange_rates[$toCurrency]) {
            throw new Exception("Unknown currency");
        }
        $sourceRate = $this->exchange_rates[$sourceCurrency];
        $toRate = $this->exchange_rates[$toCurrency];
        
        return $amount
            // Convert to PLN 
            * $sourceRate 
            // Convert to target currency
            / $toRate;
    }
}