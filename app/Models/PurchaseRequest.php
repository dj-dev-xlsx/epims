<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PurchaseRequest extends Model
{
    use HasFactory;

    protected $table = 'tbl_purchase_requests';
    protected $fillable = [

        'pr_number','focal_person', 'division_id', 'purpose', 'item_name', 'requested_by', 'quantity', 'unit', 'unit_price'
    ];
        public function division()
        {
            return $this->belongsTo(Division::class, 'division_id');
        }

        public function details()
        {
            return $this->hasMany(PurchaseRequestDetail::class, 'pr_id');
        }


}
