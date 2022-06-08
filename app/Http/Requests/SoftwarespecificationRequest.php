<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SoftwarespecificationRequest extends FormRequest
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
            'software_id' => 'required|integer',
            'offer_trial' => 'required',
            'is_lifetime_free' => 'required',
            'is_customizable' => 'required',
            'desktop_platform' => 'required',
            'available_support' => 'required',
            'runs_on_mobile_browser' => 'required',
            'payment_options' => 'required',
            'is_api_available' => 'required',
            'target_audience' => 'required',
            'mobile_platform_options' => 'required',
            'language_available' => 'required',
            'integration' => 'required'
        ];
    }
}
