<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Traits\AuthTrait;
use App\Http\Requests\CompanyRequest;
use App\Models\Admin\CompanyVerify;
use Illuminate\Http\Request;
use App\Models\Companyprofile;
use Config;
use Illuminate\Support\Facades\Storage;

class CompanyprofileController extends Controller
{
    use AuthTrait;
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data = Companyprofile::with('vendor')->get();
        // dd($data);
        return response()->json($data,200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function create(CompanyRequest $request)
    {
        $formData = $request->all();
        $formData["branches"] =$formData["branches"];
        $formData["vendor_id"] = $this->get_current_user_passport("vendor")->id;
        $allReadyCompany = Companyprofile::where('vendor_id', $formData["vendor_id"])->first();
        if(!$allReadyCompany){
            $formData["logo"] = "";
            $formData["RC"] = "Not uploaded";
                $data = Companyprofile::create($formData);
                return response()->json(['message'=>'Company profile created successfully','data'=>$data],201);
        }
        return response()->json(['message'=>'Company profile already exist']);

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $data = Companyprofile::find($id);
        return response()->json($data,200);
    }

    public function approve($id)
    {
        $data = CompanyVerify::where('company_id',$id)->first();
        $data->status = 1;
        $data->verified_by = $this->get_current_user_passport("admin")->id;
        if($data = $data->save()){
            return response()->json(["msg"=>"Approved"],200);
        }
        return response()->json(["msg"=>"Internal Server Error"],500);

    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(CompanyRequest $request, $id)
    {
        $isupdated = Companyprofile::find($id)->update($request->all());
         return response()->json(['message'=>'Company profile updated','isupdated'=>$isupdated],200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $company = Companyprofile::find($id);
        $isdeleted = $company->delete();
        return response()->json(['message'=>'Company profile deleted successfully','isdeleted' =>$isdeleted],200);
    }

    public function check_vendor_company(){
        // dd($user);
        $vendor = $this->get_current_user_passport("vendor");
        $data = Companyprofile::where('vendor_id',$vendor->id)->with('verified')->first();
        //dd($data);
        if($data){
        return response()->json($data,200);
        }
        return null;
    }


    public function logo(Request $request){
        // dd($request);
        $request->validate([
            'id'=>'required',
            'file'=>'mimes:png,jpg|max:1024|required'
        ]);
        if(($request->hasFile('file')) && ($request->id != null)){
            $file = $request->file;
            $id = $request->id;
            $data = Companyprofile::find($id);
            $filename = $data->name."_".time().".png";
            try {
                // $file->move(storage_path('public/company_logo'), $filename);
                $file->move(public_path('/storage/company_logo'), $filename);
                $data->logo = Config::get('app.url').'/storage/company_logo/'.$filename;
                $data->save();

                return response()->json(['message'=>'Company logo updated successfully','data'=>$data],200);
            } catch (\Exception $e) {
                return response()->json(['message'=>'Internal Server Error'],500);
            } catch (\Throwable $th) {
                return response()->json(['message'=>'Internal Server Error'],500);
            }

        }else{
            return response()->json(['message'=>'please input file and id']);
        }
    }
}
