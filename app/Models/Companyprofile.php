<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class Companyprofile extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'website',
        'vendor_id',
        'country',
        'email',
        'branches',
        'head_office',
        'full_address',
        'pincode',
        'number_of_employee',
        'number_of_customers',
        'GST_IN',
        'RC',
        'HSC',
        'YOE',
        'logo'
    ];

    public function vendor(){
        return $this->belongsTo(Vendor::class, 'vendor_id', 'id');
    }

    public function verified(){
        return $this->hasOne(Admin\CompanyVerify::class, 'company_id', 'id');
    }
}
