<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Auth\Middleware\Authenticate as Middleware;
use Auth;

class Vendor extends Middleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */

   public function handle($request, Closure $next, ...$guards)
    {
        session_start();
        // dd(Auth::guard('vendor')->hasUser());
         if (isset($_SESSION["vendor_loggedin"]) && $_SESSION["vendor_loggedin"]==true) {
                return $next($request);
         }

        return redirect('/home/vendorlogin');
    }
}
