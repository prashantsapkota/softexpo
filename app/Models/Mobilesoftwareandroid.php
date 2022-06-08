<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Mobilesoftwareandroid extends Model
{
    use HasFactory;
    protected $fillable = [
        'software_id',
        'android_version',
        'android_size',
        'android_requires',
        'android_installs',
        'screenshots',
    ];
}
