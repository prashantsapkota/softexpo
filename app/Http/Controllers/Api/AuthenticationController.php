<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Foundation\Auth\AuthenticatesUsers;


class AuthenticationController extends Controller
{
    use AuthenticatesUsers;

    //


    public $guard='enduser';

    protected function loggedIn(Request $request, $user)
    {
        session_start();
        $user->accessToken = $request->token;
        $_SESSION["enduser_loggedin"] = true;
        $_SESSION["enduser_token"] = $user->accessToken;
        $_SESSION["enduser"] = $user;

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
    // public function logout(Request $request)
    // {
    //     // $request->user()->token()->revoke();
    //     unset($_SESSION["admin_loggedin"]);
    //     unset($_SESSION["admin_token"]);
    //     unset($_SESSION["admin_user"]);

    //     return $request->wantsJson()
    //         ? new Response('', 204)
    //         : redirect('/');
    // }

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
    public function authenticate(Request $request)
    {
        // $this->validateLogin($request);

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


    public function attemptLogin(Request $request){
        $data = $request->all();
        $existing = User::where('email', $data['email'])->first();
        if($existing){
            if($existing->provider==$data['provider']){
                return $existing;
            }
        }else{
            $user = User::create($request->all());
            return $user;
        }
        // return response()->json(["errors"=>["email"=>["Username/Password Doesn't matches our record"]]],422);
    }



}
