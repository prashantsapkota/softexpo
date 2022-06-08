<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AndroidRequest extends FormRequest
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
        'android_version'=>'required|string',
        'android_size'=>'required|string',
        'android_requires'=>'required|string',
        'android_installs'=>'required|string',
        'screenshots'=>'required|string',
        ];
    }
}
