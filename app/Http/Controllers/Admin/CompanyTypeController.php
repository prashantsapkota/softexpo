<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Admin\CompanyType;
use Illuminate\Http\Request;

class CompanyTypeController extends Controller
{
    public function index()
    {
        $data = CompanyType::all();
        return response()->json($data,200);
    }


    public function create()
    {
        //
    }


    public function store(Request $request)
    {
        $request->validate([
            'name'=>'required|string',
        ]);
        $data = CompanyType::create($request->all());
        return response()->json(['message' => 'companytype data is created successfully', 'data' => $data], 201);
    }


    public function show($id)
    {
        $data = CompanyType::find($id);
        return response()->json($data, 200);
    }


    public function edit($id)
    {
        //
    }


    public function update(Request $request, $id)
    {

        $request->validate([
            'name'=>'required|string',
        ]);
        $data = CompanyType::find($id)->update($request->all());
        $newData = CompanyType::all();
        return response()->json($newData, 200);
    }


    public function destroy($id)
    {
        $isDeleted = CompanyType::find($id);
        $isDeleted->delete();
        return response()->json(['message' => 'companytype data deleted successfully', 'isDeleted' => $isDeleted], 200);
    }
}
