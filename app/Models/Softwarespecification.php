<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Softwarespecification extends Model
{
    use HasFactory;

    protected $fillable = [
        'software_id',
        'offer_trial',
        'is_lifetime_free',
        'is_customizable',
        'desktop_platform',
        'available_support',
        'runs_on_mobile_browser',
        'payment_options',
        'is_api_available',
        'target_audience',
        'mobile_platform_options',
        'language_available',
        'integration'
    ];
    protected $casts = [
        'desktop_platform' => 'array'
    ];


}
