<?php

use Illuminate\Support\Facades\Route;

Route::redirect('/', '/home');




Route::prefix('home')->group(function () {
    Route::get('/{path?}', function () {
        return view('welcome');
    });
});

Route::prefix('softwares')->group(function () {
    Route::get('/{path?}', function () {
        return view('welcome');
    });
});




Route::middleware(['vendor'])->prefix('vendor')->group(function () {
    Route::get('/{path?}', function () {
        return view('vendor');
    });
});

Route::middleware(['admin'])->prefix('appAdmin')->group(function () {
    Route::get('/{path?}', function () {
        return view('admin');
    });
});
