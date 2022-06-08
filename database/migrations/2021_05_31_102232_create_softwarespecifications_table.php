<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSoftwarespecificationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('softwarespecifications', function (Blueprint $table) {
            $table->id();
            $table->integer('software_id');
            $table->boolean('offer_trial');
            $table->boolean('is_lifetime_free');
            $table->boolean('is_customizable');
            $table->string('desktop_platform');
            $table->string('available_support');
            $table->boolean('runs_on_mobile_browser');
            $table->string('payment_options');
            $table->boolean('is_api_available');
            $table->string('target_audience');
            $table->string('mobile_platform_options');
            $table->string('language_available');
            $table->string('integration');
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
        Schema::dropIfExists('softwarespecifications');
    }
}
