<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Softwarecategories extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'created_by',
    ];

    protected $hidden = [
        'created_by'
    ];
    // public function Softwarecategories(){
    //     return $this->belongsTo(Softwarecategories::class);
    // }
}
