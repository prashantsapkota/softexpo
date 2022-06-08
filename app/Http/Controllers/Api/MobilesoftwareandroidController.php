<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\AndroidRequest;
use App\Models\Mobilesoftwareandroid;
use Illuminate\Http\Request;

class MobilesoftwareandroidController extends Controller
{
   
    public function index()
    {
        $data = Mobilesoftwareandroid::all();
        return response()->json($data,200);
    }

    
    public function create()
    {
        //
    }

    
    public function store(AndroidRequest $request)
    {
        $data = Mobilesoftwareandroid::create($request->all());
        return response()->json(['message'=>'mobile service created successfully','data'=> $data ],201);
    }

    
    public function show($id)
    {
        $data = Mobilesoftwareandroid::find($id);
        return response()->json($data,200);
    }

    
    public function edit($id)
    {
        //
    }

    
    public function update(AndroidRequest $request, $id)
    {
         $result = Mobilesoftwareandroid::find($id)->update($request->all());
        return response()->json($result, 200);
    }
    

    
    public function destroy($id)
    {
        $result = Mobilesoftwareandroid::find($id);
        $result->delete();
        return response()->json(['message' =>'data is deleted'] , 200 );
    }
}
