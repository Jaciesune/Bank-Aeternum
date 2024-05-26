<?php

namespace App\Console\Commands;

use App\Models\logs;
use Illuminate\Console\Command;

class ListLogs extends Command
{
    protected $signature = 'logs:list';

    protected $description = 'List all logs';

    public function handle(): void
    {
        $n = logs::all();

        $this->table(
            ['ID', 'User ID', 'Action', 'Description'],
            $n->map(function (logs $logs) {
                return [
                    $logs->id,
                    $logs->user_id,
                    $logs->action,
                    $logs->description,
                ];
            })
        );
    }
}
