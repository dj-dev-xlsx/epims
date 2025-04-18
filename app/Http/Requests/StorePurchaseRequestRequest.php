<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePurchaseRequestRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [ 
            'pr_number' => ['required', 'string'],
            'purpose' => ['nullable', 'string'],
            'division' => ['required'],
            'focal_person' => ['required'],
            'requested_by' => ['required', 'string'],
            'item_name' => ['required', 'string'],
            'quantity' => ['required', 'numeric', 'min:1'],
            'unit' => ['required', 'string'],
            'unit_price' => ['required', 'numeric', 'min:0'],
        ];        
    }
}
