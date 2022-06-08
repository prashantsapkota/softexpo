<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\IosRequest;
use App\Models\Mobilesoftwareios;
use Illuminate\Http\Request;

class MobilesoftwareiosController extends Controller
{
    
    public function index()
    {
        $data = Mobilesoftwareios::all();
        return response()->json($data,200);

    }

   
    public function create()
    {
        
    }

    
    public function store(IosRequest $request)
    {
        $data = Mobilesoftwareios::create($request->all());
        return response()->json(['message'=>'mobile service created successfully','data'=> $data ],201);
    }

    
    public function show($id)
    {
        $data = Mobilesoftwareios::find($id);
        return response()->json($data,200);
    }

    
    public function edit($id)
    {
        //
    }

    
    public function update(IosRequest $request, $id)
    {
        $result = Mobilesoftwareios::find($id)->update($request->all());
        return response()->json($result, 200);
    }

    
    public function destroy($id)
    {
        $result = Mobilesoftwareios::find($id);
        $result->delete();
        return response()->json(['message' =>'data is deleted'] , 200 );
    }
}
