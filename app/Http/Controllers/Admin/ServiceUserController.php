<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Admin\ServiceUser;
use Illuminate\Http\Request;

class ServiceUserController extends Controller
{
    
    public function index()
    {
        $data = ServiceUser::all();
        return response()->json($data,200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name'=>'required|string',
        ]);
        $data = ServiceUser::create($request->all());
        return response()->json(['message' => 'Serviceuser data is created successfully', 'data' => $data], 201);
    }

    
    public function show($id)
    {
        $data = ServiceUser::find($id);
        return response()->json($data, 200);
    }
    
    public function update(Request $request, $id)
    {
        $request->validate([
            'name'=>'required|string',
        ]);
        $data = ServiceUser::find($id)->update($request->all());
        return response()->json(['message' => 'Serviceuser data updated successfully', 'data' => $data], 200);
    }

   
    public function destroy($id)
    {
        $isDeleted = ServiceUser::find($id);
        $isDeleted->delete();
        return response()->json(['message' => 'Serviceuser data deleted successfully', 'isDeleted' => $isDeleted], 200);
    }
}
