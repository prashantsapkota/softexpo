<?php

namespace App\Http\Controllers\Admins;

use App\Http\Controllers\Controller;
use App\Models\Admin;
use App\Providers\RouteServiceProvider;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
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
    public $guard='admin';


    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }

    protected function loggedIn(Request $request, $user)
    {
        session_start();
        $user->accessToken = $user->createToken($request->input('device_name'))->accessToken;
        $_SESSION["admin_loggedin"] = true;
        $_SESSION["admin_token"] = $user->accessToken;
        $_SESSION["admin_user"] = $user;
        if($user->user_role==1){
            $this->guard = "superadmin";
        }
        return response()->json([
            'token'    => $user->accessToken,
            'user'     => $user,
            'role'     => $this->guard,
            // 'res'       => $res
        ]);
    }

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
        // $request->user()->token()->revoke();
        unset($_SESSION["admin_loggedin"]);
        unset($_SESSION["admin_token"]);
        unset($_SESSION["admin_user"]);

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
            return $this->loggedIn($request,$user);
        }

        // If the login attempt was unsuccessful we will increment the number of attempts
        // to login and redirect the user back to the login form. Of course, when this
        // user surpasses their maximum number of attempts they will get locked out.
        $this->incrementLoginAttempts($request);

        return $this->sendFailedLoginResponse($request);
    }
    public function guard(){
        return Auth::guard('admin');
    }

    public function attemptLogin(Request $request){
        $user = Admin::where("email",$request->email)->first();
        if($user){
            if($user->password == Hash::check($request->password, $user->password)){
                return $user;
            }
        }
        // return response()->json(["errors"=>["email"=>["Username/Password Doesn't matches our record"]]],422);
    }
}
