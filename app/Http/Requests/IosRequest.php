<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class IosRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            
        'software_id' => 'required|integer',
        'ios_version'=>'required|string',
        'ios_size'=>'required|string',
        'ios_requires'=>'required|string',
        'ios_installs'=>'required|string',
        'screenshots'=>'required|string',
        ];
    }
}
