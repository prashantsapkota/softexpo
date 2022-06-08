<?php

use Illuminate\Support\Facades\Route;

Route::get('software-categories',[App\Http\Controllers\Api\SoftwarecategoryController::class,'index'])->name('software');
Route::get('softwares/filters',[App\Http\Controllers\Api\SoftwarecategoryController::class,'filter'])->name('filter_software');
Route::get('softwares/show/{slug}',[App\Http\Controllers\Api\SoftwareController::class,'show'])->name('show_software');
Route::post('leads/store',[App\Http\Controllers\Api\LeadController::class,'store'])->name('new_lead');
Route::post('authenticate',[App\Http\Controllers\Api\AuthenticationController::class,'authenticate']);
Route::post('review/store',[App\Http\Controllers\Api\ReviewController::class,'store'])->name('new_review');
Route::post('search',[App\Http\Controllers\HomeController::class,'search']);
