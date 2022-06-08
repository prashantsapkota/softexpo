<?php

use App\Http\Controllers\Admin\ServiceCategoryController;
use Illuminate\Support\Facades\Route;

Route::post('admin_login', [App\Http\Controllers\Admins\LoginController::class, 'login'])->name('admin_login');

//guarded routes
Route::middleware(['admin'])->prefix('appAdmin')->group(function () {
    Route::post('/logout',[App\Http\Controllers\Admins\LoginController::class, 'logout']);
    Route::post('/create-admin',[App\Http\Controllers\Admins\RegisterController::class, 'register']);
    Route::get('/getNotifications',[App\Http\Controllers\Admin\NotificationController::class, 'getAll']);
    Route::get('/getUnreadNotifications',[App\Http\Controllers\Admin\NotificationController::class, 'getUnread']);
    Route::get('/notification/done/{id}',[App\Http\Controllers\Admin\NotificationController::class, 'done']);
    Route::get('company/show/{id}', [App\Http\Controllers\Api\CompanyprofileController::class, 'show'])->name('show_one_company');
    Route::get('company/approve/{id}', [App\Http\Controllers\Api\CompanyprofileController::class, 'approve'])->name('approve');
    Route::post('appsetting/handleLogo',[App\Http\Controllers\Api\AppSettingController::class,'handleLogo'])->name('handle_appsetting_logo');
    Route::post('add-new-category',[App\Http\Controllers\Api\SoftwarecategoryController::class,'store'])->name('store_software');
    Route::delete('software-category/delete/{id}',[App\Http\Controllers\Api\SoftwarecategoryController::class,'destroy'])->name('delete_software_category');
    Route::put('software-category/update/{id}' , [\App\Http\Controllers\Api\SoftwarecategoryController::class , 'update'])->name('update_software_category');
    Route::get('/all-leads',[App\Http\Controllers\Admin\DashboardController::class, 'allLeads']);
    Route::get('/all-softwares',[App\Http\Controllers\Admin\DashboardController::class, 'allSoftwares']);
    Route::get('/all-categories',[App\Http\Controllers\Admin\DashboardController::class, 'allCats']);
    Route::get('/all-admins',[App\Http\Controllers\Admin\AdminController::class, 'getAll']);
    Route::post('/add-admins',[App\Http\Controllers\Admin\AdminController::class, 'store']);
    Route::put('/status/{id}',[App\Http\Controllers\Admin\AdminController::class, 'status']);
    Route::delete('/admins/delete/{id}',[App\Http\Controllers\Admin\AdminController::class, 'delete']);
    Route::get('/company/all', [App\Http\Controllers\Api\CompanyprofileController::class, 'index'])->name('show_all_company');
    Route::post('/vendor/status',[App\Http\Controllers\Admin\DashboardController::class,'vendorStatus']);
     // service category data create
    Route::post('service_category/store', [ServiceCategoryController::class, 'store']);
    // show specific data of the service category
    Route::get('service_category/show/{id}', [ServiceCategoryController::class, 'show']);
    // update existing data of the service category
    Route::put('service_category/update/{id}', [ServiceCategoryController::class, 'update']);
    // delete specific data of the service category
    Route::delete('service_category/delete/{id}', [ServiceCategoryController::class, 'destroy']);
    // ----------------------------------------ServiveCategory

Route::post('companytype/store',[App\Http\Controllers\Admin\CompanyTypeController::class,'store'])->name('store_companytype');
Route::get('companytype/show/{id}',[App\Http\Controllers\Admin\CompanyTypeController::class,'show'])->name('show_companytype');
Route::put('companytype/update/{id}',[App\Http\Controllers\Admin\CompanyTypeController::class,'update'])->name('update_companytype');
Route::delete('companytype/delete/{id}',[App\Http\Controllers\Admin\CompanyTypeController::class,'destroy'])->name('destroy_companytype');
Route::get('industry/show/{id}',[App\Http\Controllers\Admin\IndustryTypeController::class,'show'])->name('show_one_industry');
Route::post('industry/store',[App\Http\Controllers\Admin\IndustryTypeController::class,'store'])->name('new_industry');
Route::put('industry/update/{id}',[App\Http\Controllers\Admin\IndustryTypeController::class,'update'])->name('update_industry');
Route::delete('industry/delete/{id}',[App\Http\Controllers\Admin\IndustryTypeController::class,'destroy'])->name('delete_industry');
Route::get('hourly_rate/show/{id}',[App\Http\Controllers\Admin\AvgHourlyRateController::class,'show'])->name('show_one_rate');
Route::post('hourly_rate/store',[App\Http\Controllers\Admin\AvgHourlyRateController::class,'store'])->name('new_rate');
Route::put('hourly_rate/update/{id}',[App\Http\Controllers\Admin\AvgHourlyRateController::class,'update'])->name('update_rate');
Route::delete('hourly_rate/delete/{id}',[App\Http\Controllers\Admin\AvgHourlyRateController::class,'destroy'])->name('delete_rate');


});
