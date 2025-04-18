<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PurchaseRequestDetail extends Model
{
    use HasFactory;

    // Table associated with the model (optional if following convention)
    protected $table = 'tbl_pr_details'; // Make sure this matches your table name

    // Fillable fields to allow mass assignment
    protected $fillable = [
        'pr_id',       // Foreign key linking to PurchaseRequest
        'item',        // Name of the item
        'quantity',    // Quantity of the item
        'unit_id',     // Foreign key linking to Unit
        'unit_price',  // Price per unit
    ];

    public function purchaseRequest()
    {
        return $this->belongsTo(PurchaseRequest::class, 'pr_id');
    }

    public function unit()
    {
        return $this->belongsTo(Unit::class, 'unit_id');
    }

}
