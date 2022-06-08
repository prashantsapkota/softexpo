<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Menubar extends Model
{
    use HasFactory;
    protected $fillable = [
        'item',
        'ischild',
        'parent_id',
        'link',
        'created_by',
    ];
}
