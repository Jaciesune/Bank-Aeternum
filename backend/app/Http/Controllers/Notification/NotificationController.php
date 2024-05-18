<?php

namespace App\Http\Controllers\Notification;

use App\Http\Controllers\Controller;
use App\Http\Resources\Notifications\NotificationResource;
use App\Models\Notification;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Notifications\DatabaseNotification;

class NotificationController extends Controller
{
    public function index()
    {
        $notifications = Auth::user()->notifications;
        return NotificationResource::collection($notifications);
    }

    // public function markAsRead($id)
    // {
    //     $notification = Auth::user()->notifications->where('id', $id)->first();
    //     if ($notification) {
    //         $notification->markAsRead();
    //         return response()->json(['message' => 'Notification marked as read'], 200);
    //     }
    //     return response()->json(['message' => 'Notification not found'], 404);
    // }
}
