<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Admin\AnnualEstimatedRevenue;
use App\Http\Requests\AnuualEstimatedRevenueRequest;

use Illuminate\Http\Request;


class AnnualEstimatedRevenueController extends Controller
{
    public function index()
    {
        $data = AnnualEstimatedRevenue::all();
        return response()->json($data, 200);
    }
    public function create()
    {
    }
    public function store(AnuualEstimatedRevenueRequest $request)
    {
        $data = AnnualEstimatedRevenue::create($request->all());
        return response()->json(['message' => 'AnnualEstimatedRevenue data is created successfully', 'data' => $data], 201);
    }
    public function show($id)
    {
        $data = AnnualEstimatedRevenue::find($id);
        return response()->json($data, 200);
    }

    public function update(AnuualEstimatedRevenueRequest $request, $id)
    {
        $data = AnnualEstimatedRevenue::find($id)->update($request->all());
        return response()->json(['message' => 'AnnualEstimatedRevenue data updated successfully', 'data' => $data], 200);
    }
    public function destroy($id)
    {
        $isDeleted = AnnualEstimatedRevenue::find($id);
        $isDeleted->delete();
        return response()->json(['message' => 'AnnualEstimatedRevenue data deleted successfully', 'isDeleted' => $isDeleted], 200);
    }
}
