<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Softwarepricing extends Model
{
    use HasFactory;
    protected $fillable = [
        'software_id',
        'plan_name',
        'currency',
        'price',
        'unit',
        'additional_features'
    ];

    protected $casts = [
        'additional_features' => 'array'
    ];
}
