<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\SoftwarepricingRequest;
use App\Models\Softwarepricing;
use Illuminate\Http\Request;
use phpseclib3\Common\Functions\Strings;

class SoftwarepricingController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $softwarePricingData = Softwarepricing::all();
        foreach($softwarePricingData as $spd)
        {
            $value = $spd->additional_features;
            if(strpos($value, '+') !== false)
            {
                $spd->additional_features = (explode('+', $value));
            }
        }
        return response()->json($softwarePricingData, 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(SoftwarepricingRequest $request)
    {
        $softwarePricing = new Softwarepricing();
        $softwarePricing->software_id = $request->input('software_id');
        $softwarePricing->plan_name = $request->input('plan_name');
        $softwarePricing->currency = $request->input('currency');
        $softwarePricing->price = $request->input('price');
        $softwarePricing->unit = $request->input('unit');
        $data = $request->additional_features;
        if(is_array($data) > 0)
        {
            $stringData = (implode(', ' , $data));
            $softwarePricing->additional_features = $stringData;
        }
        else
        {
            $softwarePricing->additional_features = $request->input('additional_features');
        }
        $softwarePricing->save();
        return response()->json(['message' => 'softwarepricing is created successfully', 'softwarepricingData' => $softwarePricing], 201);      
        
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $data = Softwarepricing::find($id);
        $value = $data->additional_features;
        if(strpos($value, '+') !== false)
        {
            $data->additional_features = (explode('+', $value));
        }
        return response()->json($data, 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(SoftwarepricingRequest $request, $id)
    {
        $updateData = Softwarepricing::find($id);
        $updateData->software_id = $request->input('software_id');
        $updateData->plan_name = $request->input('plan_name');
        $updateData->currency = $request->input('currency');
        $updateData->price = $request->input('price');
        $updateData->unit = $request->input('unit');
        $data = $request->additional_features;
        if(is_array($data) > 0)
            {
                $stringData = (implode('+', $data));
                $updateData->additional_features = $stringData;
            }
        else
        {
            $updateData->additional_features = $request->input('additional_features');
        }
        $updateData->save();
        return response()->json(['message'=>'software pricing data updated successfully', 'data'=>$updateData],200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $data = Softwarepricing::find($id);
        $isDeleted = $data->delete();
        return response()->json(['message'=>'software pricig data deleted successfully', 'isdeleted' => $isDeleted], 200);
    }
}
