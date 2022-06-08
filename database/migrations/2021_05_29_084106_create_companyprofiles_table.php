<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCompanyprofilesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('companyprofiles', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('website');
            $table->string('vendor_id');
            $table->string('country');
            $table->string('email')->unique();
            $table->string('branches');
            $table->string('head_office');
            $table->string('full_address');
            $table->string('pincode');
            $table->string('number_of_employee');
            $table->string('number_of_customers');
            $table->string('GST_IN');
            $table->string('RC');
            $table->string('HSC');
            $table->string('YOE');
            $table->string('logo');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('companyprofiles');
    }
}
