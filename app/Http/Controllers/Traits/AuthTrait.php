<?php

namespace App\Http\Controllers\Traits;

/**
 *
 */
trait AuthTrait
{


    public function get_current_user_passport($guard){
        // session_start();
        if($guard=="vendor"){
            return $_SESSION["vendor_user"];
        }
        if($guard=="admin"){
            return $_SESSION["admin_user"];
        }
    }

}
