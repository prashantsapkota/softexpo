<?php

namespace App\Observers;

use App\Models\Admin\AdminNotifications;
use App\Models\Companyprofile;
use App\Models\Admin\CompanyVerify;

class CompanyprofileObserver
{
    //
    public function created(Companyprofile $companyprofile)
    {
        //
        $statusData = [
            "company_id" => $companyprofile->id,
            "status" => 0,
        ];
        CompanyVerify::create($statusData);
        $adminNotification = [
            "type"=>"0",
            "notification"=>"A vendor added a new company : $companyprofile->name",
            "callback"=>"/appAdmin/verify-companies/$companyprofile->id",
            "status"=>0
        ];
        AdminNotifications::create($adminNotification);
    }
}
