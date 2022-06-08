<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AppsettingRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'appname' => 'required|unique:app_settings|max:255',
            'status' => 'required', 
            'address' => 'required|max:255', 
            'showfooter' => 'required',
            'showtrendingsoftware' => 'required'
        ];
    }
}
