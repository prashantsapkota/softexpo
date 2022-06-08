<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SoftwaremediaRequest extends FormRequest
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
            'software_id'=>'integer|required',
            'screenshots'=>'required|mimes:png,jpg',
            'video_link'=>'nullable|url|string',
            'brochure_link'=>'nullable|url|string',
            'ebooks'=>'nullable',
            'whitepapers'=>'nullable',
            'pdf'=>'nullable',
            'guides'=>'nullable',
        ];
    }
}
