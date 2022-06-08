<?php

namespace App\Models\Admin;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AdminNotifications extends Model
{
    use HasFactory;
    protected $fillable = [
        "type",
        "notification",
        "callback",
        "status"
    ];
}
