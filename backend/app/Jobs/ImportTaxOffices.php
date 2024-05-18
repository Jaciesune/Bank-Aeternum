<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\DB;
use App\Models\TaxOffice;
use Exception;

class ImportTaxOffices implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public TaxOffice $taxOffice;

    /**
     * Create a new job instance.
     */
    public function __construct()
    {
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        // Dane zostaly pobrane z
        // https://dane.gov.pl/en/dataset/3116,rachunki-bankowe-urzedow-skarbowych/resource/53619/table?page=1&per_page=20&q=&sort=
        $offices = json_decode(file_get_contents(__DIR__.'/tax-offices.json'), true);
        if (!$offices) {
            throw new Exception("Tax office api error");
        }
        DB::transaction(function () use ($offices) {
            TaxOffice::truncate();
            foreach ($offices as $office) {
                TaxOffice::create($office);
            }
        });
    }
}
