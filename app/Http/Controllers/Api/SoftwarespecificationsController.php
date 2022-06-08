<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\SoftwarespecificationRequest;
use App\Models\Softwarespecification;
use Illuminate\Http\Request;

class SoftwarespecificationsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $softwareSpecificationData = Softwarespecification::all();
        foreach ($softwareSpecificationData as $softspecification) {
            $value1 = $softspecification->desktop_platform;
            if (strpos($value1, '+') !== false) {
                $softspecification->desktop_platform = explode('+', $value1);
            }

            $value2 = $softspecification->available_support;
            if (strpos($value2, '+') !== false) {
                $softspecification->available_support = explode('+', $value2);
            }

            $value3 = $softspecification->payment_options;
            if (strpos($value3, '+')) {
                $softspecification->payment_options = explode('+', $value3);
            }

            $value4 = $softspecification->target_audience;
            if (strpos($value4, '+')) {
                $softspecification->target_audience = explode('+', $value4);
            }

            $value5 = $softspecification->language_available;
            if (strpos($value5, '+')) {
                $softspecification->language_available = explode('+', $value5);
            }
        }
        return response()->json($softwareSpecificationData, 200);
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
    public function store(SoftwarespecificationRequest $request)
    {
        // $softwareSpecification = Softwarespecification::create($request->all());
        $softspec = new Softwarespecification();
        $softspec->software_id = $request->input('software_id');
        $softspec->offer_trial = $request->input('offer_trial');
        $softspec->is_lifetime_free = $request->input('is_lifetime_free');
        $softspec->is_customizable = $request->input('is_customizable');
        $data = $request->desktop_platform;
        if (is_array($data) > 0) {
            $stringData = implode(', ', $data);
            $softspec->desktop_platform = $stringData;
        } else {
            $softspec->desktop_platform = $request->input('desktop_platform');
        }

        $data1 = $request->available_support;
        if (is_array($data1) > 0) {
            $stringData = implode(', ', $data1);
            $softspec->available_support = $stringData;
        } else {
            $softspec->available_support = $request->input('available_support');
        }
        $softspec->runs_on_mobile_browser = $request->input('runs_on_mobile_browser');

        $data2 = $request->payment_options;
        if (is_array($data2) > 0) {
            $stringData = implode(', ', $data2);
            $softspec->payment_options = $stringData;
        } else {
            $softspec->payment_options = $request->input('payment_options');
        }

        $softspec->is_api_available = $request->input('is_api_available');

        $data3 = $request->target_audience;
        if (is_array($data3) > 0) {
            $stringData = implode(', ', $data3);
            $softspec->target_audience = $stringData;
        } else {
            $softspec->target_audience = $request->input('target_audience');
        }


        $softspec->mobile_platform_options = $request->input('mobile_platform_options');

        $data4 = $request->language_available;
        if (is_array($data4) > 0) {
            $stringData = implode(', ', $data4);
            $request->language_available = $stringData;
        } else {
            $softspec->language_available = $request->input('language_available');
        }

        $softspec->integration = $request->input('integration');

        // dd($softspec);

        $softspec->save();

        return response()->json(['msg' => 'Saved'], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $data = Softwarespecification::find($id);
        $value1 = $data->desktop_platform;
        if (strpos($value1, '+') !== false) {
            $data->desktop_platform = explode('+', $value1);
        }
        $value2 = $data->available_support;
        if (strpos($value2, '+') !== false) {
            $data->available_support = explode('+', $value2);
        }

        $value3 = $data->payment_options;
        if (strpos($value3, '+')) {
            $data->payment_options = explode('+', $value3);
        }

        $value4 = $data->target_audience;
        if (strpos($value4, '+')) {
            $data->target_audience = explode('+', $value4);
        }

        $value5 = $data->language_available;
        if (strpos($value5, '+')) {
            $data->language_available = explode('+', $value5);
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
    public function update(SoftwarespecificationRequest $request, $id)
    {
        $softspecUpdate = Softwarespecification::find($id);
        $softspecUpdate->software_id = $request->input('software_id');
        $softspecUpdate->offer_trial = $request->input('offer_trial');
        $softspecUpdate->is_lifetime_free = $request->input('is_lifetime_free');
        $softspecUpdate->is_customizable = $request->input('is_customizable');

        $data = $request->desktop_platform;
        if (is_array($data) > 0) {
            $stringData = implode(', ', $data);
            $softspecUpdate->desktop_platform = $stringData;
        } else {
            $softspecUpdate->desktop_platform = $request->input('desktop_platform');
        }

        $data1 = $request->available_support;
        if (is_array($data1) > 0) {
            $stringData = implode(', ', $data1);
            $request->available_support = $stringData;
        } else {
            $softspecUpdate->available_support = $request->input('available_support');
        }
        $softspecUpdate->runs_on_mobile_browser = $request->input('runs_on_mobile_browser');

        $data2 = $request->payment_options;
        if (is_array($data2) > 0) {
            $stringData = implode(', ', $data2);
            $request->payment_options = $stringData;
        } else {
            $softspecUpdate->payment_options = $request->input('payment_options');
        }

        $softspecUpdate->is_api_available = $request->input('is_api_available');

        $data3 = $request->target_audience;
        if (is_array($data3) > 0) {
            $stringData = implode(', ', $data3);
            $request->target_audience = $stringData;
        } else {
            $softspecUpdate->target_audience = $request->input('target_audience');
        }

        $softspecUpdate->mobile_platform_options = $request->input('mobile_platform_options');

        $data4 = $request->language_available;
        if (is_array($data4) > 0) {
            $stringData = implode(', ', $data4);
            $request->language_available = $stringData;
        } else {
            $softspecUpdate->language_available = $request->input('language_available');
        }
        $softspecUpdate->integration = $request->input('integration');

        $softspecUpdate->save();

        return response()->json(['message' => 'software specifacation data updated successfully', 'data' => $softspecUpdate], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $data = Softwarespecification::find($id);
        $data->delete();
        return response()->json(['message' => 'software specification data deleted successfully'], 200);
    }
}
