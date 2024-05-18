<?php

namespace App\Console\Commands;

use App\Jobs\ImportTaxOffices;
use Illuminate\Console\Command;

class ImportTaxOffice extends Command
{
    protected $signature = 'import:taxoffice';

    protected $description = 'Import Tax Offices';

    public function handle(): void
    {
        ImportTaxOffices::dispatch();
    }
}
