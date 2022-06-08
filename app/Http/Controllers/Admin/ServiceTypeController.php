<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Admin\ServiceType;
use Illuminate\Http\Request;

class ServiceTypeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data_all = ServiceType::all();
        if(count($data_all) > 0){
             return response()->json($data_all,200);
        }else{
            return response()->json(['message'=>'Empty'],200);
        }
       
    }

    


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'name'=>'required|string',
        ]);
        $allData = $request->all();
        $data = ServiceType::create($allData);
        return response()->json(['message'=>'created successfully','data'=>$data],201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $data = ServiceType::find($id);
        if(!empty($data)){
             return response()->json($data,200);
        }else{
            return response()->json(['message'=>'empty or something went wrong'],200);
        }
    }

   

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'name'=>'required|string',
        ]);
        $isUpdated = ServiceType::find($id)->update($request->all());
        if($isUpdated){
            return response()->json(['message'=>'Updated successfully','IsUpdated'=>$isUpdated],200);
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
        $data = ServiceType::find($id);
        $isDeleted = $data->delete();
        if($isDeleted){
            return response()->json(['message'=>'Deleted successfully','IsDeleted'=>$isDeleted],200);
        }else{
            return response()->json(['message'=>'Something went wrong'],200);
        }
    }
}
