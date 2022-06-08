<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Admin;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    //
    public function getAll(){
        $data = Admin::where('user_role',0)->get();
        return $data;
    }

    public function status($id){
            $admin = Admin::where('id',$id)->first();

            ($admin->status=="1") ? $admin->status = 0 : $admin->status = 1;
            if($admin->save()){
                $data = $this->getAll();
                return response()->json($data,200);
            }
    }
    public function delete($id)
    {
        $admin = Admin::find($id);
        $admin->delete();
        $data = $this->getAll();
        return response()->json($data,200);
    }
}
