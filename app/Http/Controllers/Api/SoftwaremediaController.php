<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\SoftwaremediaRequest;
use App\Models\SoftwareMedia;
use Illuminate\Support\Facades\Storage;
use Config;

class SoftwaremediaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //show all data
        $alldata =  SoftwareMedia::all();
            foreach($alldata as $datas){
                //screenshots
               $temp6 = $datas->screenshots;
                    if(strpos($temp6,"+") !== false){
                        $array = (explode("+",$temp6));
                          foreach($array as $arr){
                             $path_arrray[] = public_path('app/public/screenshots/'.$arr);

                            }
                      $datas->screenshots = $path_arrray;
                  $path_arrray = [];
            }

          //ebooks
           $temp7 = $datas->ebooks;
          if($temp7 != null){
              if(strpos($temp7,"+") !== false){
                 $array = (explode("+",$temp7));
                   foreach($array as $arr){

                     $path_arrray[] = public_path('app/public/ebooks/'.$arr);

                      }
                  $datas->ebooks = $path_arrray;
                 $path_arrray = [];
             }
          }

          $temp8 = $datas->whitepapers;
          if($temp8 != null){
             if(strpos($temp8,"+") !== false){
                $array = (explode("+",$temp8));
                  foreach($array as $arr){
                     $path_arrray[] = public_path('app/public/whitepapers/'.$arr);

                      }
                  $datas->whitepapers = $path_arrray;
                $path_arrray = [];
           }
         }
       $temp9 = $datas->pdfs;
       if($temp9 != null){
        if(strpos($temp9,"+") !== false){
            $array = (explode("+",$temp9));
            foreach($array as $arr){
                $path_arrray[] = public_path('app/public/pdf/'.$arr);

            }
            $datas->pdfs = $path_arrray;
            $path_arrray = [];

        }else{
            $datas->pdf=  (storage_path('app/public/pdf/'.$temp9));

        }
       }
       $temp10 = $datas->guides;
       if($temp10 != null){
        if(strpos($temp10,"+") !== false){
            $array = (explode("+",$temp10));
            foreach($array as $arr){
                $path_arrray[] = public_path('app/public/guides/'.$arr);

            }
            $datas->guides = $path_arrray;
            $path_arrray = [];
        }
       }
          $path_arrray = [];
       }

       return response()->json([$alldata,200]);
    }


    /**
     * Show the form for creating a new resource.
     *Store a newly created resource in storage.
     * @return \Illuminate\Http\Response
     */
    public function create(SoftwaremediaRequest $request)
    {

        $software_media = new SoftwareMedia;
        $software_media->software_id = $request->input('software_id');

        //screenshots file upload
        if($request->hasFile('screenshots')){
            $screenshots = $request->screenshots;
            if(is_array($screenshots) == 1){
                $temp1 =[];
                foreach($screenshots as $screenshot){
                    $filename = "screenshot_".rand().".".$screenshot->extension();
                   $screenshot->move(public_path('/storage/screenshots/'),$filename);
                   $temp1[] = Config::get('app.url').'/storage/screenshots/'.$filename;
                }
                $data= (implode("+",$temp1));
                $software_media->screenshots = $data;
        }else{
            $filename = "screenshot_".rand().".".$screenshots->extension();
            $screenshots->move(public_path('/storage/screenshots/'),$filename);
            $software_media->screenshots = Config::get('app.url').'/storage/screenshots/'.$filename;
           }
        }

        $software_media->video_link = $request->input('video_link');
        $software_media->brochure_link =$request->input('brochure_link');

        //ebooks file upload
        if($request->ebooks == null){
            $software_media->ebooks = $request->input('ebooks');
        }else{
            if((is_array($request->ebooks))==1){
                $temp2 = [];
                foreach($request->ebooks as $ebook){
                    $filename = "ebook_".rand().".".$ebook->extension();
                   $ebook->move(public_path('/storage/ebooks/'),$filename);
                   $temp2[] = Config::get('app.url').'/storage/ebooks/'.$filename;
                }
                $data= (implode("+",$temp2));
                $software_media->ebooks = $data;
           }else{
            $filename = "ebook_".rand().".".$request->ebooks->extension();
            $request->ebooks->move(public_path('/storage/ebooks/'),$filename);
            $software_media->ebooks =Config::get('app.url').'/storage/ebooks/'.$filename;
            }
          }



        //whitepapers
        if($request->whitepapers == null){
            $software_media->whitepapers = $request->input('whitepapers');
        }else{
            if((is_array($request->whitepapers))==1){
                $temp3 =[];
                foreach($request->whitepapers as $whitepaper){
                    $filename = "whitepaper_".rand().".".$whitepaper->extension();
                   $whitepaper->move(public_path('/storage/whitepapers/'),$filename);
                   $temp3[] = Config::get('app.url').'/storage/whitepapers/'.$filename;
                }
                $data= (implode("+",$temp3));
                $software_media->whitepapers = $data;
        }else{
            $filename ="whitepaper_".rand().".".$request->whitepapers->extension();
            $request->whitepapers->move(public_path('/storage/whitepapers/'),$filename);
            $software_media->whitepapers = Config::get('app.url').'/storage/whitepapers/'.$filename;
           }
        }

        //pdf

        if($request->pdf == null){
            $software_media->pdf = $request->input('pdf');
        }else{
             if((is_array($request->pdf))==1){
                $temp4 = [];
                foreach($request->pdf as $pdfs){
                    $filename = "pdf_".rand().".".$pdfs->extension();
                   $pdfs->move(public_path('/storage/pdf/'),$filename);
                   $temp4[] = Config::get('app.url').'/storage/pdf/'.$filename;
                }
                $data= (implode("+",$temp4));
               $software_media->pdf = $data;
        }else{
            $filename = "pdf_".rand().".".$request->pdf->extension();
            $request->pdf->move(public_path('/storage/pdf/'),$filename);
            $software_media->pdf = Config::get('app.url').'/storage/pdf/'.$filename;
           }
        }
        //guides
        if($request->guides == null){
            $software_media->guides = $request->input('guides');
        }else{
            if((is_array($request->guides))==1){
                $temp5 =[];
                foreach($request->guides as $guide){
                    $filename =  "guide_".rand().".".$guide->extension();
                   $guide->move(public_path('/storage/guides/'),$filename);
                   $temp5[]= Config::get('app.url').'/storage/guides/'.$filename;
                }
                $data= (implode("+",$temp5));
                $software_media->guides = $data;
        }else{
            $filename =  "guide_".rand().".".$request->guides->extension();
            $request->guides->move(public_path('/storage/guides/'),$filename);
            $software_media->guides = Config::get('app.url').'/storage/guides/'.$filename;
           }
        }
        if($request->app){
            // dd(explode('.',));
            $software_media->app = $request->app;
        }
        $software_media->save();
        return response()->json(['message'=>'Data saved  successfully','CreatedData'=>$software_media],201);

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //show single data
        $data = SoftwareMedia::find($id);
        $temp6 = $data->screenshots;
        if(strpos($temp6,"+") !== false){
            $array = (explode("+",$temp6));
            foreach($array as $arr){
                $path_arrray[] = public_path('app/public/screenshots/'.$arr);
            }
            $data->screenshots = $path_arrray;
            $path_arrray = [];
        }
       $temp7 = $data->ebooks;
       if($temp7 != null){
        if(strpos($temp7,"+") !== false){
            $array = (explode("+",$temp7));
            foreach($array as $arr){
                $path_arrray[] = (storage_path('app/public/ebooks/'.$arr));

            }
            $data->ebooks = $path_arrray;
            $path_arrray = [];
        }
       }
       $temp8 = $data->whitepapers;
       if($temp8 != null){
        if(strpos($temp8,"+") !== false){
            $array = (explode("+",$temp8));
            foreach($array as $arr){

                $path_arrray[] = public_path('app/public/whitepapers/'.$arr);
            }
            $data->whitepapers = $path_arrray;
            $path_arrray = [];
        }else{
            $data->whitepapers =  (storage_path('app/public/whitepapers/'.$temp8));

        }
       }
       $temp9 = $data->pdf;
       if($temp9 != null){
        if(strpos($temp9,"+") !== false){
            $array = (explode("+",$temp9));
            foreach($array as $arr){
                $path_arrray[] = public_path('app/public/pdf/'.$arr);
            }
            $data->pdf = $path_arrray;
            $path_arrray = [];
        }else{
            $data->pdf=  (storage_path('app/public/pdf/'.$temp9));

        }
       }
       $temp10 = $data->guides;
       if($temp10 != null){
        if(strpos($temp10,"+") !== false){
            $array = (explode("+",$temp10));
            foreach($array as $arr){
                $path_arrray[] = public_path('app/public/guides/'.$arr);

            }
            $data->guides = $path_arrray;
            $path_arrray = [];
        }
       }
       return response()->json($data,200);
    }



    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(SoftwaremediaRequest $request, $id)
    {
        //fetch data of particular id and delete the data from local storage and update new data

        $data = SoftwareMedia::find($id);
        $data->software_id = $request->input('software_id');
        if($request->hasFile('screenshots')){
            $value = $data->screenshots;


            //delete file
            if(strpos($value, "+") !== false){
                $data->screenshots = (explode("+",$value));
                foreach($data->screenshots as $one){
                    $one = str_replace('http://localhost:8000/storage/screenshots/','',$one);
                    unlink(storage_path('app/public/screenshots/'.$one));
                }
            }else{
                $value = str_replace('http://localhost:8000/storage/screenshots/','',$value);
                unlink(storage_path('app/public/screenshots/'.$value));
            }

             //upload file
            $screenshots = $request->screenshots;
            if(is_array($screenshots) == 1){
                $temp1 =[];
                foreach($screenshots as $screenshot){
                    $filename = $screenshot->getClientOriginalName();
                   $screenshot->move(public_path('/storage/screenshots/'),$filename);
                   $temp1[] = $filename;
                }
                $stringForm= (implode("+",$temp1));
                $data->screenshots = $stringForm;
        }else{
            $filename = $screenshots->getClientOriginalName();
            $screenshots->move(public_path('/storage/screenshots/'),$filename);
            $data->screenshots = $filename;
           }
        }


        $data->video_link = $request->input('video_link');
        $data->brochure_link =$request->input('brochure_link');


        //ebooks
            if($data->ebooks != null){
                $value = $data->ebooks;
                if(strpos($value, "+") !== false){
                    $data->ebooks = (explode("+",$value));
                    foreach($data->ebooks as $ebook){
                        $ebook = str_replace('http://localhost:8000/storage/ebooks/','',$ebook);
                        unlink(storage_path('app/public/ebooks/'.$ebook));
                    }
                }else{
                    $value = str_replace('http://localhost:8000/storage/ebooks/','',$value);
                    unlink(storage_path('app/public/ebooks/'.$value));
                }
               }
               if($request->ebooks == null){
                $data->ebooks = $request->input('ebooks');
            }else{
                if((is_array($request->ebooks))==1){
                    $temp2 = [];
                    foreach($request->ebooks as $ebook){
                        $filename = "ebook_".rand().".".$ebook->extension();
                       $ebook->move(public_path('/storage/ebooks/'),$filename);
                       $temp2[] = Config::get('app.url').'/storage/ebooks/'.$filename;
                    }
                    $stringForm= (implode("+",$temp2));
                    $data->ebooks = $stringForm;
               }else{
                $filename = "ebook_".rand().".".$request->ebooks->extension();
                $request->ebooks->move(public_path('/storage/ebooks/'),$filename);
                $data->ebooks =Config::get('app.url').'/storage/ebooks/'.$filename;
                }
        }
        //whitepapers

            if($data->whitepapers != null){
                $value = $data->whitepapers;
                if(strpos($value, "+") !== false){
                    $data->whitepapers = (explode("+",$value));
                    foreach($data->whitepapers as $whitepaper){
                        $whitepaper = str_replace('http://localhost:8000/storage/whitepapers/','',$whitepaper);
                       unlink(storage_path('app/public/whitepapers/'.$whitepaper));
                    }
                }else{
                    $value = str_replace('http://localhost:8000/storage/whitepapers/','',$value);
                    unlink(storage_path('app/public/whitepapers/'.$value));
                }
               }
               if($request->whitepapers == null){
                $data->whitepapers = $request->input('whitepapers');
                }else{
                if((is_array($request->whitepapers))==1){
                    $temp3 =[];
                    foreach($request->whitepapers as $whitepaper){
                        $filename = "whitepaper_".rand().".".$whitepaper->extension();
                       $whitepaper->move(public_path('/storage/whitepapers/'),$filename);
                       $temp3[] = Config::get('app.url').'/storage/whitepapers/'.$filename;
                    }
                    $stringForm= (implode("+",$temp3));
                    $data->whitepapers = $stringForm;
               }else{
                $filename ="whitepaper_".rand().".".$request->whitepapers->extension();
                $request->whitepapers->move(public_path('/storage/whitepapers/'),$filename);
                $data->whitepapers = Config::get('app.url').'/storage/whitepapers/'.$filename;
               }
      }

      //pdf
        if($data->pdf != null){
            $value = $data->pdf;
            if(strpos($value, "+") !== false){
                $data->pdf = (explode("+",$value));
                foreach($data->pdf as $one){
                    $one = str_replace('http://localhost:8000/storage/pdf/','',$one);
                    unlink(storage_path('app/public/pdf/'.$one));
                }
            }else{
                $value = str_replace('http://localhost:8000/storage/pdf/','',$value);
                unlink(storage_path('app/public/pdf/'.$value));
            }
          }

        if($request->pdf == null){
            $data->pdf = $request->input('pdf');
        }else{
            if((is_array($request->pdf))==1){
                $temp4 = [];
                foreach($request->pdf as $pdfs){
                    $filename = "pdf_".rand().".".$pdfs->extension();
                   $pdfs->move(public_path('/storage/pdf/'),$filename);
                   $temp4[] = Config::get('app.url').'/storage/pdf/'.$filename;
                }
                $stringForm= (implode("+",$temp4));
               $data->pdf = $stringForm;
        }else{
            $filename = "pdf_".rand().".".$request->pdf->extension();
            $request->pdf->move(public_path('/storage/pdf/'),$filename);
            $data->pdf = Config::get('app.url').'/storage/pdf/'.$filename;
           }
    }

    //guides
    if($data->guides != null){
        $value = $data->guides;
        if(strpos($value, "+") !== false){
            $data->guides = (explode("+",$value));
            foreach($data->guides as $guide){
                $guide = str_replace('http://localhost:8000/storage/guides/','',$guide);
                unlink(storage_path('app/public/guides/'.$guide));
            }
        }else{
            $value = str_replace('http://localhost:8000/storage/guides/','',$value);
            unlink(storage_path('app/public/guides/'.$value));
        }
       }
       if($request->guides == null){
        $data->guides = $request->input('guides');
    }else{
        if((is_array($request->guides))==1){
            $temp5 =[];
            foreach($request->guides as $guide){
                $filename =  "guide_".rand().".".$guide->extension();
               $guide->move(public_path('/storage/guides/'),$filename);
               $temp5[]= Config::get('app.url').'/storage/guides/'.$filename;
            }
            $stringForm= (implode("+",$temp5));
            $data->guides = $stringForm;
    }else{
        $filename =  "guide_".rand().".".$request->guides->extension();
        $request->guides->move(public_path('/storage/guides/'),$filename);
        $data->guides = Config::get('app.url').'/storage/guides/'.$filename;
       }
    }
    $data->save();
    return response()->json(['message'=>'Software media successfully updated','UpdatedData'=>$data],200);

  }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {


       $data = SoftwareMedia::find($id);
       $isDeleted =$data->delete();
       $value = $data->screenshots;
       if(strpos($value, "+") !== false){
           $data->screenshots = (explode("+",$value));
           foreach($data->screenshots as $one){
               //$one= substr($one,42);
              $one = str_replace('http://localhost:8000/storage/screenshots/','',$one);
              unlink(storage_path('app/public/screenshots/'.$one));
           }
       }else{
       $value = str_replace('http://localhost:8000/storage/screenshots/','',$value);
        unlink(storage_path('app/public/screenshots/'.$value));
       }

       if($data->ebooks != null){
        $value = $data->ebooks;
        if(strpos($value, "+") !== false){
            $data->ebooks = (explode("+",$value));
            foreach($data->ebooks as $ebook){
                $ebook = str_replace('http://localhost:8000/storage/ebooks/','',$ebook);
                unlink(storage_path('app/public/ebooks/'.$ebook));
            }
        }else{
            $value = str_replace('http://localhost:8000/storage/ebooks/','',$value);
            unlink(storage_path('app/public/ebooks/'.$value));
        }
       }
       if($data->whitepapers != null){
        $value = $data->whitepapers;
        if(strpos($value, "+") !== false){
            $data->whitepapers = (explode("+",$value));
            foreach($data->whitepapers as $whitepaper){
                $whitepaper = str_replace('http://localhost:8000/storage/whitepapers/','',$whitepaper);
                unlink(storage_path('app/public/whitepapers/'.$whitepaper));
            }
        }else{
            $value = str_replace('http://localhost:8000/storage/whitepapers/','',$value);
            unlink(storage_path('app/public/whitepapers/'.$value));
        }
       }
       if($data->pdf != null){
        $value = $data->pdf;
        if(strpos($value, "+") !== false){
            $data->pdf = (explode("+",$value));
            foreach($data->pdf as $one){
                $one = str_replace('http://localhost:8000/storage/pdf/','',$one);
                unlink(storage_path('app/public/pdf/'.$one));
            }
        }else{
            $value = str_replace('http://localhost:8000/storage/pdf/','',$value);
            unlink(storage_path('app/public/pdf/'.$value));
        }
       }
       if($data->guides != null){
        $value = $data->guides;
        if(strpos($value, "+") !== false){
            $data->guides = (explode("+",$value));
            foreach($data->guides as $guide){
                $guide = str_replace('http://localhost:8000/storage/guides/','',$guide);
                unlink(storage_path('app/public/guides/'.$guide));
            }
        }else{
            $value = str_replace('http://localhost:8000/storage/guides/','',$value);
            unlink(storage_path('app/public/guides/'.$value));
        }
       }
       if($isDeleted == true){
           return response()->json(['message'=>'Deleted successfully','isdeleted'=>$isDeleted],200 );
       }else{
           return response()->json(['message'=>'Cannot delete something went wrong']);
       }
    }
}
