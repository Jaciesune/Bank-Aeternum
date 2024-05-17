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
        Schema::create('loans', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('loan_id')->nullable();
            $table->string('user_id')->nullable();
            $table->string('amount')->nullable();
            $table->string('interest_rate')->nullable();
            $table->string('duration')->nullable();
            $table->string('status')->nullable();
            $table->string('currency')->nullable();
            $table->string('installment')->nullable();
            $table->string('installment_id')->nullable();
            $table->string('loan_amount')->nullable();
            $table->string('installment_type')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('loans');
    }
};
