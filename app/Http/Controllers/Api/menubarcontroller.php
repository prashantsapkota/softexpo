<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\MenubarRequest;
use App\Models\Menubar;
use Illuminate\Http\Request;

class MenubarController extends Controller
{
   
    public function index()
    {
        $menubar = Menubar::all();
        return response()->json($menubar,201);
        // return response()->json(["message"=>"APi CALLEd"] , 200);
    }
    // public function test(){
    //     return response()->json(["message"=>"APi CALLEd"] , 200);
    // }

    
    public function create(MenubarRequest $request)
    {
        $result= Menubar::create($request->all());
        return response()->json($result , 201);
     
    }

    
    public function store(MenubarRequest $request)
    {
        //
        $result = Menubar::create($request->all());
        return response()->json($result,201);
       

    }

    
    public function show($id)
    {
        $data = Menubar::find($id);
        return response()->json($data,201);
    }

    
    public function edit($id)
    {
        //
    }

    
    public function update(MenubarRequest $request, $id)
    {
        $result = Menubar::find($id)->update($request->all());
         return response()->json($result, 201);
    }

    
    public function destroy($id)
    {
        $result = Menubar::find($id);
        $result->delete();
        return response()->json(['message' =>'data is deleted'] , 201 );

        

    }
}
