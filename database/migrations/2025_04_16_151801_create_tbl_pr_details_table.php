<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tbl_pr_details', function (Blueprint $table) {
            $table->id();
            $table->foreignId('pr_id')->constrained('tbl_purchase_requests')->restrictOnDelete();
            $table->string('item', 50);
            $table->foreignId('unit_id')->constrained('tbl_units')->restrictOnDelete();
            $table->decimal('quantity', 10, 2);
            $table->decimal('unit_price', 10, 2);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tbl_pr_details');
    }
};
