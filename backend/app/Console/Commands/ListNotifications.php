<?php

namespace App\Console\Commands;

use App\Models\Notification;
use Illuminate\Console\Command;

class ListNotifications extends Command
{
    protected $signature = 'notifications:list';

    protected $description = 'List all notifications';

    public function handle(): void
    {
        $n = Notification::all();

        $this->table(
            ['ID', 'User ID', 'Title', 'Content', 'Created At'],
            $n->map(function (Notification $notification) {
                return [
                    $notification->id,
                    $notification->user_id,
                    $notification->title,
                    $notification->content,
                    $notification->created_at,
                ];
            })
        );
    }
}
