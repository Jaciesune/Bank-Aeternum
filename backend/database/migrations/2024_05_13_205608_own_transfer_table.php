<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        DB::statement('
            CREATE TABLE own_transfers (
                id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                created_at TIMESTAMP NULL,
                updated_at TIMESTAMP NULL
            )
        ');
    }

    public function down(): void
    {
        DB::statement('DROP TABLE IF EXISTS own_transfers');
    }
};
