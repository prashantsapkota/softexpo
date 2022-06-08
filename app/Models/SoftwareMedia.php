<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SoftwareMedia extends Model
{
    use HasFactory;
    protected $fillable = [
        'software_id',
        'screenshots',
        'video_link',
        'brochure_link',
        'ebooks',
        'whitepapers',
        'pdf',
        'guides',
    ];

}
