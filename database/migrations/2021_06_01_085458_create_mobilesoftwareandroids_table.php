<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMobilesoftwareandroidsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mobilesoftwareandroids', function (Blueprint $table) {
            $table->id();
            $table->foreignId('software_id')->references('id')->on('software');;
            $table->string('android_version');
            $table->string('android_size');
            $table->string('android_requires');
            $table->string('android_installs');
            $table->string('screenshots');
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
        Schema::dropIfExists('mobilesoftwareandroids');
    }
}
