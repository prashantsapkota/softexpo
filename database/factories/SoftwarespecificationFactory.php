<?php

namespace Database\Factories;

use App\Models\Softwarespecification;
use Illuminate\Database\Eloquent\Factories\Factory;

class SoftwarespecificationFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Softwarespecification::class;

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
            'software_id' => $faker->numberBetween(1,20),
            'offer_trial' => $faker->randomElement([0,1]),
            'is_lifetime_free' => $faker->randomElement([0,1]),
            'is_customizable' => $faker->randomElement([0,1]),
            'desktop_platform' =>$faker->randomElement($array = array ('Web App','Windows','Mac')),
            'available_support' =>$faker->randomElement(['Email,Phone,Live Support,Training,Tickets']),
            'runs_on_mobile_browser'=>$faker->randomElement([0,1]),
            'payment_options'=>$faker->randomElement($array = array ('Yearly','Monthly','One Time')),
            'is_api_available'=>$faker->randomElement([0,1]),
            'target_audience' =>$faker->randomElement($array = array ('startup','Freelancers','Agencies')),
            'mobile_platform_options'=>$faker->randomElement($array = array ('Android','IOS')),
            'language_available'=>$faker->randomElement($array = array ('English and Few Others','English Only')),
            'integration'=>$faker->words($nb = 3, $asText = true),
        ];
    }
}
