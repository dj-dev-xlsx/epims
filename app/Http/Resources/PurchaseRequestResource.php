<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PurchaseRequestResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'pr_number' => $this->pr_number,
            'focal_person' => $this->focal_person,
            'purpose' => $this->purpose,
            'requested_by' => $this->requested_by,
            'division' => $this->division?->division,
            'date_processed' => $this->date_processed,
            'details' => $this->details->map(function ($detail) {
                return [
                    'item' => $detail->item,
                    'quantity' => $detail->quantity,
                    'unit' => $detail->unit?->unit,
                    'unit_price' => $detail->unit_price,
                ];
            }),
        ];
    }
}
