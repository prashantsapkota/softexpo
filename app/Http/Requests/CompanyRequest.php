<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CompanyRequest extends FormRequest
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
            'name' => 'required|string|max:255',
            'website'=>'required|string',
            'country'=>'required|string',
            'email' => 'required|string|email|max:255|unique:companyprofiles,email',
            'branches'=>'required',
            'head_office' => 'required|string',
            'full_address'=>'required|string',
            'pincode'=>'required|string',
            'number_of_employee'=>'required|string',
            'number_of_customers'=>'required|string',
            'GST_IN'=>'required|string',
            // 'RC'=>'string',
            'HSC'=>'required|string',
            'YOE'=>'required|string',
            // 'logo'=>'required|file',
        ];
    }
}
