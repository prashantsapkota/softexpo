<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Lead extends Model
{
    use HasFactory;

    protected $fillable = [
        'software_id',
        'name',
        'email',
        'phone'
    ];

    public function software(){
        return $this->hasOne(Software::class,'id','software_id');
    }




}
