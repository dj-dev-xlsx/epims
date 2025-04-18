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
        Schema::create('tbl_purchase_requests', function (Blueprint $table) {
            $table->id();
            $table->foreignId('focal_person')->constrained('users')->restrictOnDelete();
            $table->string('pr_number', 15);
            $table->text('purpose')->nullable();
            $table->foreignId('division_id')->constrained('tbl_divisions')->restrictOnDelete();
            $table->string('requested_by');
            $table->date('date_processed')->nullable();
            $table->enum('status', ['Pending', 'Approved', 'Rejected'])->default('Pending');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tbl_purchase_requests');
    }
};
