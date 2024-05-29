<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        DB::statement('
            CREATE TABLE accounts (
                id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                created_at TIMESTAMP NULL,
                updated_at TIMESTAMP NULL,
                name VARCHAR(255) NOT NULL,
                account_number VARCHAR(255) UNIQUE NOT NULL,
                balance DECIMAL(10, 2) NOT NULL,
                currency VARCHAR(255) NOT NULL,
                type ENUM("personal", "savings", "youth") NOT NULL,
                INDEX (account_number)
            )
        ');
    }

    public function down(): void
    {
        DB::statement('DROP TABLE IF EXISTS accounts');
    }
};
