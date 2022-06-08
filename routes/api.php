<?php

use App\Http\Controllers\Admin\ServiceCategoryController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AppSettingController;
use App\Http\Controllers\Api\SoftwarepricingController;
use App\Http\Controllers\Api\SoftwarespecificationsController;
use App\Http\Controllers\Admin\AnnualEstimatedRevenueController;
use App\Http\Controllers\Admin\CompanyTypeController;
use App\Http\Controllers\Admin\ServiceUserController;
use App\Models\Softwarespecification;

Route::group(['as' => 'api.'], function () {

  //Auth

  //login function for vendor -- middleware set
  Route::post('vendor_login', [App\Http\Controllers\Vendors\LoginController::class, 'login'])->name('login');
  //register -- middleware done
  Route::post('vendor_register', [App\Http\Controllers\Vendors\RegisterController::class, 'register'])->name('register');

  //rem
  //----------------Auth sudeep

    // vendor routes
Route::middleware(['vendor'])->prefix('vendor')->group(function () {

    Route::post('/logout',[App\Http\Controllers\Vendors\LoginController::class, 'logout']);
    // id required and show individual
    Route::get('company/show/{id}', [App\Http\Controllers\Api\CompanyprofileController::class, 'show'])->name('show_one_company');
    //create new company profile
    Route::post('company/create', [App\Http\Controllers\Api\CompanyprofileController::class, 'create'])->name('new_company');
    //update existing company profile and id required
    Route::put('company/update/{id}', [App\Http\Controllers\Api\CompanyprofileController::class, 'update'])->name('update_company');
    //delete existing company profile and id required
    Route::delete('company/delete/{id}', [App\Http\Controllers\Api\CompanyprofileController::class, 'destroy'])->name('delete_company');
    Route::get('check_vendor_company',[App\Http\Controllers\Api\CompanyprofileController::class,'check_vendor_company']);
    Route::post('company/handlelogo',[App\Http\Controllers\Api\CompanyprofileController::class,'logo'])->name('handle_logo');


    //-------------------------------------company profiles


    // software------------------------------------------------------------Bibek

    //show all
    Route::get('all-softwares', [App\Http\Controllers\Api\SoftwareController::class, 'index'])->name('show_all_software');
    // id required and show individual
    Route::get('software/show/{id}', [App\Http\Controllers\Api\SoftwareController::class, 'show'])->name('show_one_software');
    //add new software
    Route::post('software/create', [App\Http\Controllers\Api\SoftwareController::class, 'create'])->name('new_software');
    //update existing software and id required
    Route::put('software/update/{id}', [App\Http\Controllers\Api\SoftwareController::class, 'update'])->name('update_software');
    //delete existing software and id required
    Route::delete('software/delete/{id}', [App\Http\Controllers\Api\SoftwareController::class, 'destroy'])->name('delete_software');
    Route::post('software/handle-logo',[App\Http\Controllers\Api\SoftwareController::class, 'handleLogo']);

    //-------------------------------------------------------------software

    // Software Specification------------------------Sirjana
  // show all data
  Route::get('software_specification', [SoftwarespecificationsController::class, 'index']);
  // software specification data create
  Route::post('software_specification/store', [SoftwarespecificationsController::class, 'store']);
  // show specific data of the software specification
  Route::get('software_specification/show/{id}', [SoftwarespecificationsController::class, 'show']);
  // update existing data of the software specification
  Route::put('software_specification/update/{id}', [SoftwarespecificationsController::class, 'update']);
  // delete specific data of the software specification
  Route::delete('software_specification/delete/{id}', [SoftwarespecificationsController::class, 'destroy']);

  // -------------- software specification

  //add new software_media
  Route::post('softwaremedia/create', [App\Http\Controllers\Api\SoftwaremediaController::class, 'create'])->name('newsoftware_media');

  Route::get('leads',[App\Http\Controllers\Api\LeadController::class,'index'])->name('show_all_leads');

  Route::delete('leads/delete/{id}',[App\Http\Controllers\Api\LeadController::class,'destroy'])->name('delete_lead');


  });




  //App Setting
  // Route::resources('appsettings', AppSettingController::class);


  // menubar............................................................Sharmila

  //show all
  Route::get('menubar', [App\Http\Controllers\Api\MenubarController::class, 'index'])->name('show_menu');

  //create new menubar
  Route::post('menubar/create', [App\Http\Controllers\Api\MenubarController::class, 'create'])->name('add_menu');

  //delete existing menubar
  Route::delete('menubar/delete/{id}', [App\Http\Controllers\Api\MenubarController::class, 'destroy'])->name('delete');

  //show only one menubar using id
  Route::get('menubar/show/{id}', [App\Http\Controllers\Api\MenubarController::class, 'show'])->name('show_one_menu');

  // update the exiting menubar
  Route::put('menubar/update/{id}', [\App\Http\Controllers\Api\MenubarController::class, 'update'])->name('update_menubar');





  //software_media-------------------------------------------------------Bibek
  //show all
  Route::get('softwaremedia', [App\Http\Controllers\Api\SoftwaremediaController::class, 'index'])->name('showallsoftware_media');
  // id required and show individual
  Route::get('softwaremedia/show/{id}', [App\Http\Controllers\Api\SoftwaremediaController::class, 'show'])->name('showonesoftware_media');

  //update existing software_media and id required
  Route::put('softwaremedia/update/{id}', [App\Http\Controllers\Api\SoftwaremediaController::class, 'update'])->name('updatesoftware_media');
  //delete existing software_nedia and id required
  Route::delete('softwaremedia/delete/{id}', [App\Http\Controllers\Api\SoftwaremediaController::class, 'destroy'])->name('deletesoftware_media');
  //------------------------------------------------------------software_media



  // Software pricing-----------------------------------------------
  // show all data
  Route::get('software_pricing', [SoftwarepricingController::class, 'index']);
  // software pricing data create
  Route::post('software_pricing/store', [SoftwarepricingController::class, 'store']);
  // show specific data of the software pricing
  Route::get('software_pricing/show/{id}', [SoftwarepricingController::class, 'show']);
  // update existing data of the software pricing
  Route::put('software_pricing/update/{id}', [SoftwarepricingController::class, 'update']);
  // delete specific data of the software pricing
  Route::delete('software_pricing/delete/{id}', [SoftwarepricingController::class, 'destroy']);

  // -------------- software pricing


  //mobilesoftwareios---------------------------------------------------------------------sharmila

  Route::get('mobile', [App\Http\Controllers\Api\MobilesoftwareiosController::class, 'index'])->name('mobile');
  Route::post('mobile/store', [App\Http\Controllers\Api\MobilesoftwareiosController::class, 'store'])->name('store_mobile');
  Route::get('mobile/show/{id}', [App\Http\Controllers\Api\MobilesoftwareiosController::class, 'show'])->name('show_mobile');
  Route::put('mobile/update/{id}', [\App\Http\Controllers\Api\MobilesoftwareiosController::class, 'update'])->name('update_mobile');

  Route::delete('mobile/delete/{id}', [App\Http\Controllers\Api\MobilesoftwareiosController::class, 'destroy'])->name('delete_mobile');

  //.........................................................................................................mobilesoftwareios



    //mobilesoftwareandroid---------------------------------------------------------------------------------sharmila
    Route::get('android',[App\Http\Controllers\Api\MobilesoftwareandroidController::class,'index'])->name('android');
    Route::post('android/store',[App\Http\Controllers\Api\MobilesoftwareandroidController::class,'store'])->name('store_android');
    Route::get('android/show/{id}',[App\Http\Controllers\Api\MobilesoftwareandroidController::class,'show'])->name('show_android');
    Route::put('android/update/{id}' , [\App\Http\Controllers\Api\MobilesoftwareandroidController::class , 'update'])->name('update_android');
    Route::delete('android/delete/{id}',[App\Http\Controllers\Api\MobilesoftwareandroidController::class,'destroy'])->name('delete_android');

  //--------------------------------------------------------------------------------------------------------mobilesoftwareandroid


  //softwarecategory----------------------------------------------------------------------------------------------sharmila


    Route::get('software/show/{id}',[App\Http\Controllers\Api\SoftwarecategoryController::class,'show'])->name('show_software');



    //Industry Type -----------------------------------------------------------------
    Route::get('industry',[App\Http\Controllers\Admin\IndustryTypeController::class,'index'])->name('show_all_industry');


    //Average hourly rate---------------------------------------------
    Route::get('hourly_rate',[App\Http\Controllers\Admin\AvgHourlyRateController::class,'index'])->name('show_all_rate');


    //Service types------------------------------------------------------
    Route::get('service_type',[App\Http\Controllers\Admin\ServiceTypeController::class,'index'])->name('all_service_type');
    Route::get('service_type/show/{id}',[App\Http\Controllers\Admin\ServiceTypeController::class,'show'])->name('one_service_type');
    Route::post('service_type/store',[App\Http\Controllers\Admin\ServiceTypeController::class,'store'])->name('new_service_type');
    Route::put('service_type/update/{id}',[App\Http\Controllers\Admin\ServiceTypeController::class,'update'])->name('update_service_type');
    Route::delete('service_type/delete/{id}',[App\Http\Controllers\Admin\ServiceTypeController::class,'destroy'])->name('delete_service_type');

  // AnnualEstimatedRevenue -----------------------------------------Sirjana

  Route::get('annual_estiamted_revenue', [AnnualEstimatedRevenueController::class, 'index']);
  // annual estimated revenue data create
  Route::post('annual_estiamted_revenue/store', [AnnualEstimatedRevenueController::class, 'store']);
  // show specific data of the annual estimated revenue
  Route::get('annual_estiamted_revenue/show/{id}', [AnnualEstimatedRevenueController::class, 'show']);
  // update existing data of the annual estimated revenue
  Route::put('annual_estiamted_revenue/update/{id}', [AnnualEstimatedRevenueController::class, 'update']);
  // delete specific data of the annual estimated revenue
  Route::delete('annual_estiamted_revenue/delete/{id}', [AnnualEstimatedRevenueController::class, 'destroy']);
  // ----------------------------------------AnnualEstimatedRevenue

  // ServiveCategory -----------------------------------------Sirjana

  Route::get('service_category', [ServiceCategoryController::class, 'index']);







  //ServiceUser.......................................................................sharmila

 Route::get('serviceuser',[App\Http\Controllers\Admin\ServiceUserController::class,'index'])->name('serviceuser');
 Route::post('serviceuser/store',[App\Http\Controllers\Admin\ServiceUserController::class,'store'])->name('store_serviceuser');
 Route::get('serviceuser/show/{id}',[App\Http\Controllers\Admin\ServiceUserController::class,'show'])->name('show_serviceuser');
 Route::put('serviceuser/update/{id}',[App\Http\Controllers\Admin\ServiceUserController::class,'update'])->name('update_serviceuser');
 Route::delete('serviceuser/delete/{id}',[App\Http\Controllers\Admin\ServiceUserController::class,'destroy'])->name('destroy_serviceuser');

//  -----------------------------------------------------------------------------serviceuser



// Companytype...............................................................................................sharmila
Route::get('companytype',[App\Http\Controllers\Admin\CompanyTypeController::class,'index'])->name('companytype');


//leads
Route::get('lead/show/{id}',[App\Http\Controllers\Api\LeadController::class,'show'])->name('show_one_lead');
Route::put('lead/update/{id}',[App\Http\Controllers\Api\LeadController::class,'update'])->name('update_lead');

//reviews
Route::get('review',[App\Http\Controllers\Api\ReviewController::class,'index'])->name('show_all_reviews');
Route::get('review/show/{id}',[App\Http\Controllers\Api\ReviewController::class,'show'])->name('show_one_review');
Route::put('review/update/{id}',[App\Http\Controllers\Api\ReviewController::class,'update'])->name('update_review');
Route::delete('review/delete/{id}',[App\Http\Controllers\Api\ReviewController::class,'destroy'])->name('delete_review');

});
