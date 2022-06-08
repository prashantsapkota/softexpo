<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSoftwarepricingsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('softwarepricings', function (Blueprint $table) {
            $table->id();
            $table->integer('software_id');
            $table->string('plan_name');
            $table->string('currency');
            $table->string('price');
            $table->string('unit');
            $table->string('additional_features');
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
        Schema::dropIfExists('softwarepricings');
    }
}
