<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        DB::statement('
            ALTER TABLE users 
            ADD COLUMN address_id BIGINT UNSIGNED NULL,
            ADD CONSTRAINT users_address_id_foreign FOREIGN KEY (address_id) REFERENCES addresses(id) ON DELETE CASCADE
        ');
    }

    public function down(): void
    {
        DB::statement('
            ALTER TABLE users 
            DROP FOREIGN KEY users_address_id_foreign,
            DROP COLUMN address_id
        ');
    }
};
