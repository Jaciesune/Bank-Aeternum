<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        DB::unprepared('CREATE TRIGGER after_user_update
            AFTER UPDATE ON users
            FOR EACH ROW
                INSERT INTO logs (user_id, action, description, created_at, updated_at)
                VALUES (NEW.id, "update", CONCAT("User updated: ", OLD.email, " to ", NEW.email), NOW(), NOW())');

        DB::unprepared('
            CREATE PROCEDURE UpdateTransactionStatus(
                IN transaction_id BIGINT,
                IN new_status VARCHAR(255)
            )
            BEGIN
                UPDATE transactions
                SET status = new_status, updated_at = NOW()
                WHERE id = transaction_id;
            END
        ');

        DB::unprepared('
            CREATE FUNCTION GetTransactionStatus(transaction_id BIGINT)
            RETURNS VARCHAR(255)
            DETERMINISTIC
            BEGIN
                DECLARE status_value VARCHAR(255);
                SELECT status INTO status_value
                FROM transactions
                WHERE id = transaction_id;
                RETURN status_value;
            END
        ');
    }

    public function down()
    {
        DB::unprepared('DROP FUNCTION IF EXISTS GetTransactionStatus');
        DB::unprepared('DROP TRIGGER IF EXISTS after_user_update');
        DB::unprepared('DROP PROCEDURE IF EXISTS UpdateTransactionStatus');
    }
};
