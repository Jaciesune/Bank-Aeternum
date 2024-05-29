<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        DB::statement('
            CREATE TABLE addresses (
                id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                street VARCHAR(255) NOT NULL,
                house_number VARCHAR(255) NOT NULL,
                apartment_number VARCHAR(255) NULL,
                postal_code VARCHAR(255) NOT NULL,
                city VARCHAR(255) NOT NULL,
                country VARCHAR(255) NOT NULL,
                created_at TIMESTAMP NULL,
                updated_at TIMESTAMP NULL
            )
        ');
    }

    public function down(): void
    {
        DB::statement('DROP TABLE IF EXISTS addresses');
    }
};
