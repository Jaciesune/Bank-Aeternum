<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTaxOfficesTable extends Migration
{
    public function up()
    {
        Schema::create('tax_offices', function (Blueprint $table) {
            $table->id();
            $table->string('office_code');
            $table->string('office_name');
            $table->string('street');
            $table->string('number');
            $table->string('postcode');
            $table->string('province');
            $table->string('bank_account_type');
            $table->string('bank_account_number');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('tax_offices');
    }
}