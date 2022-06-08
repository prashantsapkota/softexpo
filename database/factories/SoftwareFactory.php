<?php

namespace Database\Factories;

use App\Models\Software;
use Illuminate\Database\Eloquent\Factories\Factory;

class SoftwareFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Software::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $faker = $this->faker;
        return [
            //
        'vendor_id' => $faker->numberBetween(1,21),
        'software_name' => $faker->sentence(2,true),
        'tagline' => $faker->sentence(6,true),
        'software_logo'=>$faker->imageUrl($width = 640, $height = 480),
        'category_id'=>$faker->numberBetween(1,10),
        'software_competitors'=>$faker->words($nb = 3, $asText = true),
        'summary'=>$faker->sentence($nbWords = 6, $variableNbWords = true),
        'description'=>$faker->paragraph(3,true),
        ];
    }
}
