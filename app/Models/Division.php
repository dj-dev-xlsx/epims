<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Division extends Model
{
    protected $table = 'tbl_divisions';
    protected $fillable = [
        'division',
    ];
    public function requestedBy()
    {
        return $this->hasOne(RequestedBy::class, 'division_id');
    }

    public function purchaseRequests()
    {
        return $this->hasMany(PurchaseRequest::class, 'division_id');
    }
}
