<?php

namespace Database\Seeders;

use App\Models\Software;
use App\Models\Softwarecategories;
use App\Models\Softwarespecification;
use App\Models\Vendor;
use Illuminate\Database\Seeder;
use Database\Seeders\AdminTableSeeder;
use Database\Seeders\AppSettingSeeder;
use Database\Seeders\VendorTableSeeder;
class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();

        $this->call([
            AdminTableSeeder::class,
            VendorTableSeeder::class,
            AppSettingSeeder::class,
        ]);

        Softwarecategories::factory(5)->create();
        Software::factory(10)->create();
        Softwarespecification::factory(10)->create();
    }
}
