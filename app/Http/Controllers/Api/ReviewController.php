<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Review;
use App\Http\Requests\ReviewRequest;

class ReviewController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data_all = Review::all();
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
    public function store(ReviewRequest $request)
    {
        $formData = $request->all();
        $data = new Review();
        $data->user_id = $formData['user_id'];
        $data->software_id = $formData['software_id'];
        $data->text = $formData['text'];
        $data->save();
        return response()->json(['message'=>'Review created successfully','data'=>$data],201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $data = Review::find($id);
        return response()->json($data, 200);
    }

    

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(ReviewRequest $request, $id)
    {
        $formData = $request->all();
        $update = Review::find($id);
         $update->user_id = $formData['user_id'];
        $update->software_id = $formData['software_id'];
        $update->text = $formData['text'];
        $update->save();
        if($update){
            return response()->json(['message'=>'Updated successfully','UpdatedData'=>$update],200);
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
        $data = Review::find($id);
        $isDeleted = $data->delete();
        if($isDeleted){
            return response()->json(['message'=>'Deleted successfully','IsDeleted'=>$isDeleted],200);
        }else{
            return response()->json(['message'=>'Something went wrong'],200);
        }
    }
}
