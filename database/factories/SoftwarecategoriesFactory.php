<?php

namespace Database\Factories;

use App\Models\Softwarecategories;
use Illuminate\Database\Eloquent\Factories\Factory;

class SoftwarecategoriesFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Softwarecategories::class;

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
        'name' => $faker->word(),
        'created_by'=>$faker->numberBetween(1,21)
        ];
    }
}
