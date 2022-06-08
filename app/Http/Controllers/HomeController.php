<?php

namespace App\Http\Controllers;

use App\Models\Software;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        // $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        return view('home');
    }

    public function search(Request $request){
        $project = Software::query();
        if ($request->query) {
            $project->where('software_name', 'Like', '%' . request('query') . '%');
        }

        $data = $project->orderBy('id', 'DESC')->paginate(10);
        return response()->json($data);

    }

}
