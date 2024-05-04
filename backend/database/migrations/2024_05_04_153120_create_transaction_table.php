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
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->morphs('transfer');
            $table->decimal('amount', 10, 2);
            $table->string('status');
            $table->string('to_account');
            $table->string('from_account');
            $table->string('elixir');
            $table->string('title');
            $table->string('transaction_ip');
            $table->string('currency');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};
