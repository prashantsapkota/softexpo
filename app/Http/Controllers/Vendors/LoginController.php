<?php

namespace App\Http\Controllers\Vendors;

use App\Http\Controllers\Controller;
use App\Models\Vendor;
use App\Providers\RouteServiceProvider;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth as FacadesAuth;
use Illuminate\Support\Facades\Hash;

/**
 * @group Auth endpoints
 */
class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;



    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = RouteServiceProvider::HOME;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }

    public function guard(){
        return FacadesAuth::guard('vendor');
    }
    protected function sendLoginResponse(Request $request,$user)
    {
        $this->clearLoginAttempts($request);

        if ($response = $this->authenticated($request, $this->guard()->user())) {
            return $response;
        }
        session_start();
        $user->accessToken = $user->createToken($request->input('device_name'))->accessToken;
        $_SESSION["vendor_loggedin"] = true;
        $_SESSION["vender_token"] = $user->accessToken;
        $_SESSION["vendor_user"] = $user;
        // $token = Request::create(
        //     'oauth/token',
        //     'POST'
        // );
        // $res = Route::dispatch($token);
        return response()->json([
            'token'    => $user->accessToken,
            'user'     => $user,
            'role'     => $this->guard,
            // 'res'       => $res
        ]);
    }

    public $guard='vendor';

    /**
     * Log the user out of the application.
     *
     * @authenticated
     * @response status=204 scenario="Success" {}
     * @response status=400 scenario="Unauthenticated" {
     *     "message": "Unauthenticated."
     * }
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function logout(Request $request)
    {
        // return dd($request);
        // $request->user("vendor")->token()->revoke();
        $_SESSION["vendor_loggedin"] = false;
        unset($_SESSION["vender_token"]);
        unset($_SESSION["vendor_user"] );
        // Auth::guard('vendor')->get
        return $request->wantsJson()
            ? new Response('', 204)
            : redirect('/');
    }

    /**
     * Handle a login request to the application.
     *
     * @bodyParam email email required The email of the user. Example: demo@demo.com
     * @bodyParam password password required The password of the user. Example: password
     *
     * @response status=422 scenario="Validation error" {
     *    "message": "The given data was invalid.",
     *    "errors": {
     *        "email": [
     *            "The email field is required."
     *        ]
     *    }
     * }
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse|\Illuminate\Http\Response|\Illuminate\Http\JsonResponse
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function login(Request $request)
    {
        $this->validateLogin($request);

        // If the class is using the ThrottlesLogins trait, we can automatically throttle
        // the login attempts for this application. We'll key this by the username and
        // the IP address of the client making these requests into this application.
        if (method_exists($this, 'hasTooManyLoginAttempts') &&
            $this->hasTooManyLoginAttempts($request)) {
            $this->fireLockoutEvent($request);

            return $this->sendLockoutResponse($request);
        }

        if ($user = $this->attemptLogin($request)) {
            return $this->sendLoginResponse($request,$user);
        }

        // If the login attempt was unsuccessful we will increment the number of attempts
        // to login and redirect the user back to the login form. Of course, when this
        // user surpasses their maximum number of attempts they will get locked out.
        $this->incrementLoginAttempts($request);

        return $this->sendFailedLoginResponse($request);
    }

    public function attemptLogin(Request $request){
        $user = Vendor::where("email",$request->email)->first();
        if($user){
            if($user->password == Hash::check($request->password, $user->password)){
                return $user;
            }
        }
        // return response()->json(["errors"=>["email"=>["Username/Password Doesn't matches our record"]]],422);
    }

    protected function validateLogin(Request $request)
    {
        $request->validate([
            'email' => 'required|string',
            'password' => 'required|string',
        ]);
    }

}
