<?php

namespace App\Models\Admin;

use App\Models\Admin;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CompanyVerify extends Model
{
    use HasFactory;
    protected $fillable = [
        "company_id","status","verified_by"
    ];

    public function verifed_by(){
        return $this->belongsTo(Admin::class,"verified_by","id");
    }

    protected $table = "company_verification";
}
