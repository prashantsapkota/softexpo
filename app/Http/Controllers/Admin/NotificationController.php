<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Admin\AdminNotifications;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    //

    public function getAll(){
        $data = AdminNotifications::all();
        $data = $data->toArray();
        return response()->json($data);
    }

    public function getUnread(){
        $data = AdminNotifications::where('status',0)->get();
        $data = $data->toArray();
        return response()->json($data);
    }

    public function done($id){
        $data = AdminNotifications::where('status',0)->where('id',$id)->first();
        $data->status = 1;
        $data->save();
        return true;
    }

}
