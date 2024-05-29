<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        DB::statement('
            CREATE TABLE transactions (
                id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                created_at TIMESTAMP NULL,
                updated_at TIMESTAMP NULL,
                transfer_id BIGINT UNSIGNED NOT NULL,
                transfer_type VARCHAR(255) NOT NULL,
                amount DECIMAL(10, 2) NOT NULL,
                status VARCHAR(255) NOT NULL,
                to_account VARCHAR(255) NOT NULL,
                from_account VARCHAR(255) NOT NULL,
                elixir VARCHAR(255) NOT NULL,
                title VARCHAR(255) NOT NULL,
                transaction_ip VARCHAR(255) NOT NULL,
                currency VARCHAR(255) NOT NULL,
                INDEX (to_account),
                INDEX (from_account)
            )
        ');
    }

    public function down(): void
    {
        DB::statement('DROP TABLE IF EXISTS transactions');
    }
};
