<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Mobilesoftwareios extends Model
{
    use HasFactory;

    protected $fillable = [
        'software_id',
        'ios_version',
        'ios_size',
        'ios_requires',
        'ios_installs',
        'screenshots',
    ];
}
