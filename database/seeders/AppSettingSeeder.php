<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\DB;

class AppSettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        DB::table('app_settings')->insert([
            'appname' => Config::get('app.name', 'SoftExpo'),
            'setup' => 0,
            'address' => "Nepal",
            'showfooter' => 0,
            'showtrendingsoftware'=>1,
        ]);
    }
}
