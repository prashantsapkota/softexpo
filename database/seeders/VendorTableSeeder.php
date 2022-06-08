<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;


class VendorTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        DB::table('vendors')->insert([
            'name' => "CodewithSudeep",
            'email' => 'codewithsudeep@gmail.com',
            'password' => Hash::make('password'),
            'status' => 1

        ]);
    }
}
