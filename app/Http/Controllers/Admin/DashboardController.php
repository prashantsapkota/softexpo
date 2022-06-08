<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Lead;
use App\Models\Software;
use App\Models\Softwarecategories;
use App\Models\Vendor;
use Illuminate\Http\Request;

// use Illuminate\Http\Request;

class DashboardController extends Controller
{
    //

    public function allLeads(){
        $data = Lead::all();
        return response()->json($data);
    }

    public function allSoftwares(){
        $data = Software::all();
        return response()->json($data);
    }

    public function allCats(){
        $data = Softwarecategories::all();
        return response()->json($data);
    }

    public function vendorStatus(Request $request){
        // $vendor  = $request->id;
        $newVendor  = Vendor::find($request->id);
        $newVendor->status = ($newVendor->status==1) ? 0 : 1;
        if($newVendor->save()){
            return response()->json(["msg"=>"Deactivated"]);
        }
    }
}
