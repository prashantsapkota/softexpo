<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Traits\AuthTrait;
use App\Models\Software;
use App\Models\Softwarecategories;
use Illuminate\Http\Request;

class SoftwarecategoryController extends Controller
{
    use AuthTrait;
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data = Softwarecategories::all();
        return response()->json($data,200);
    }

    public function filter(Request $request){
        $filters = $request->all();
        $data =[];
        foreach ($filters as $key => $value) {
           $Localdata = Software::where($key,$value)->get();
           $data[] = $Localdata;
        }
        return response()->json($data[0]);
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
    public function store(Request $request)
    {
        $data = $request->all();
        $data["created_by"] = $this->get_current_user_passport("admin")->id;
        $new_data = Softwarecategories::create($data);
        return response()->json($new_data,201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($slug)
    {
        $data = Softwarecategories::where('slug',$slug)->first();
        return response()->json($data,200);
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
    public function update(Request $request, $id)
    {
        $result = Softwarecategories::find($id)->update($request->all());
        if ($result) {
            $data = Softwarecategories::all();
            return response()->json($data, 200);
        }
        return response()->json(["msg"=>"Internal Server Error"], 500);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $result = Softwarecategories::find($id);
        $result->delete();
        return response()->json(['msg' =>'Item Deleted'] , 200 );
    }
}
