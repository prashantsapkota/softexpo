<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;


class AdminTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        DB::table('admins')->insert([
            'name' => "Super Admin",
            'email' => 'superadmin@gmail.com',
            'password' => Hash::make('password'),
            'user_role' => 1,
            'status' => 1,
        ]);
    }
}
