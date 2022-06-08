<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Admin\ServiceCategory;
use Illuminate\Http\Request;

class ServiceCategoryController extends Controller
{
    public function index()
    {
        $data = ServiceCategory::all();
        return response()->json($data, 200);
    }
    public function create()
    {
    }
    public function store(Request $request)
    {
        $data = ServiceCategory::create($request->all());
        return response()->json(['message' => 'ServiceCategory data is created successfully', 'data' => $data], 201);
    }
    public function show($id)
    {
        $data = ServiceCategory::find($id);
        return response()->json($data, 200);
    }

    public function update(Request $request, $id)
    {
        $data = ServiceCategory::find($id)->update($request->all());
        $newData = ServiceCategory::all();
        return response()->json($newData, 200);
    }
    public function destroy($id)
    {
        $isDeleted = ServiceCategory::find($id);
        $isDeleted->delete();
        return response()->json(['message' => 'ServiceCategory data deleted successfully', 'isDeleted' => $isDeleted], 200);
    }
}
