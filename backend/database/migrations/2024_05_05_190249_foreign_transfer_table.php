<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        DB::statement('
            CREATE TABLE foreign_transfers (
                id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                created_at TIMESTAMP NULL,
                updated_at TIMESTAMP NULL,
                country VARCHAR(255) NOT NULL
            )
        ');
    }

    public function down(): void
    {
        DB::statement('DROP TABLE IF EXISTS foreign_transfers');
    }
};
