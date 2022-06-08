<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LeadRequest;
use Illuminate\Http\Request;
use App\Models\lead;
use App\Http\Controllers\Traits\AuthTrait;
use App\Models\Software;

class LeadController extends Controller
{
    use AuthTrait;
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $vendorId = $this->get_current_user_passport("vendor")->id;
        $data_all = Software::where('vendor_id',$vendorId)->with('leads')->get();
        $data = [];
        if(count($data_all) > 0){
            foreach ($data_all as $key) {
                if($key->leads){
                    $data[] = $key->leads;
                }
            }
             return response()->json($data,200);
        }else{
            return response()->json($data,200);
        }
    }



    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(LeadRequest $request)
    {
        $formData = $request->all();
        $data = new Lead();
        $data->software_id = $formData['software_id'];
        $data->name = $formData['name'];
        $data->email = $formData['email'];
        $data->phone = $formData['phone'];
        $data->save();
        return response()->json(['message'=>'lead created successfully','data'=>$data],201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $data = Lead::find($id);
        return response()->json($data, 200);
    }



    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(LeadRequest $request, $id)
    {
        $formData = $request->all();
        $update = Lead::find($id);
        $update->software_id = $formData['software_id'];
        $update->name = $formData['name'];
        $update->email = $formData['email'];
        $update->phone = $formData['phone'];
        $update->save();
        if($update){
            return response()->json(['message'=>'Updated successfully','UpdatedData'=>$update],200);
        }else{
            return response()->json(['message'=>'Something went wrong'],200);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $data = Lead::find($id);
        $isDeleted = $data->delete();
        if($isDeleted){
            $data_all = Lead::with('software')->get();
            return response()->json(['message'=>'Deleted successfully','data'=>$data_all],200);
        }else{
            return response()->json(['message'=>'Something went wrong'],200);
        }
    }
}
