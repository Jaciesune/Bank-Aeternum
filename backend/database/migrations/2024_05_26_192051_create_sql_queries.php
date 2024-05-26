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
        DB::unprepared('
            CREATE TRIGGER after_user_update
                AFTER UPDATE ON users
                FOR EACH ROW
                    INSERT INTO logs (user_id, action, description, created_at, updated_at)
                    VALUES (NEW.id, "update", CONCAT("User updated: ", OLD.email, " to ", NEW.email), NOW(), NOW())');

        DB::unprepared('
            CREATE PROCEDURE GetProcedures()
            BEGIN
                DECLARE result TEXT;
                SELECT GROUP_CONCAT(CONCAT("Database: ", ROUTINE_SCHEMA, ", Procedure Name: ", ROUTINE_NAME) SEPARATOR "\n") INTO result
                FROM INFORMATION_SCHEMA.ROUTINES
                WHERE ROUTINE_TYPE = "PROCEDURE";
                SELECT result AS "Procedures";
            END
        ');

        DB::unprepared('
            CREATE PROCEDURE GetUserNotifications(IN p_user_id INT)
            BEGIN
                SELECT 
                    id AS notification_id,
                    title,
                    content,
                    status,
                    created_at,
                    updated_at
                FROM notifications
                WHERE user_id = p_user_id
                ORDER BY created_at DESC;
            END
        ');

        DB::unprepared('
            CREATE FUNCTION GetFunctions()
            RETURNS TEXT
            DETERMINISTIC
            BEGIN
                DECLARE result TEXT;
                SELECT GROUP_CONCAT(CONCAT("Database: ", ROUTINE_SCHEMA, ", Function Name: ", ROUTINE_NAME) SEPARATOR "\n") INTO result
                FROM INFORMATION_SCHEMA.ROUTINES
                WHERE ROUTINE_TYPE = "FUNCTION";
                RETURN result;
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
        DB::unprepared('DROP TRIGGER after_user_update');
        DB::unprepared('DROP PROCEDURE GetUserNotifications');
        DB::unprepared('DROP PROCEDURE GetProcedures');
        DB::unprepared('DROP FUNCTION GetTransactionStatus');
        DB::unprepared('DROP FUNCTION GetFunctions');
    }
};
