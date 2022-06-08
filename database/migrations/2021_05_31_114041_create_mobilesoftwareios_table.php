<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMobilesoftwareiosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mobilesoftwareios', function (Blueprint $table) {
            $table->id();
            $table->integer('software_id')->nullable(false);
            $table->string('ios_version');
            $table->string('ios_size');
            $table->string('ios_requires');
            $table->string('ios_installs');
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
        Schema::dropIfExists('mobilesoftwareios');
    }
}
