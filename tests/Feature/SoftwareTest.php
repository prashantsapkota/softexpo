<?php

namespace Tests\Feature;

use App\Models\Software;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class SoftwareTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_example()
    {
        $soft = Software::all();
        if($soft){
            $this->assertTrue(true);
        }
    }
}
