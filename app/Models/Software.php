<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Str;
// use Nicolaslopezj\Searchable\SearchableTrait;

class Software extends Model
{
    use HasFactory;

    protected $fillable = [
        'vendor_id',
        'software_name',
        'tagline',
        'software_logo',
        'category_id',
        'software_competitors',
        'summary',
        'description',
    ];

    public function vendor(){
        return $this->hasOne(Vendor::class, 'id', 'vendor_id');
    }

    public function software_media(){
        return $this->hasOne(SoftwareMedia::class,'software_id','id');
    }

    public function category(){
        return $this->hasOne(Softwarecategories::class,'id','category_id');
    }

    public function specifications(){
        return $this->hasOne(Softwarespecification::class,'software_id','id');
    }

    public function pricing(){
        return $this->hasOne(Softwarepricing::class,'software_id','id');
    }

    public function leads(){
        return $this->hasOne(Lead::class,'software_id','id');
    }

    public function reviews(){
        return $this->hasMany(Review::class,'software_id','id');
    }

    // protected $dateFormat = 'Y-M-d';

    // public function getDateTimeAttribute($value)
    // {
    //     $value->format($this->desiredFormat);
    // }


    protected static function boot() {
        parent::boot();
        static::creating(function ($question) {
            $question->slug = Str::slug($question->software_name);
        });
    }


}
