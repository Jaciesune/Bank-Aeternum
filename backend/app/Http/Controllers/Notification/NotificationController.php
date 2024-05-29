<?php

namespace App\Http\Controllers\Notification;

use App\Http\Controllers\Controller;
use App\Http\Resources\Notifications\NotificationResource;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class NotificationController extends Controller
{
    public function index()
    {
        $userId = Auth::id();
        $notifications = DB::select('SELECT id, user_id, title, content, created_at FROM notifications WHERE user_id = ?', [$userId]);

        $notificationsCollection = collect($notifications);
        return NotificationResource::collection($notificationsCollection);
    }
}
