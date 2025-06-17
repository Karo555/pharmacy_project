ALTER TABLE pharmacy.users
    MODIFY COLUMN first_name   VARCHAR(50)  NULL,
    MODIFY COLUMN last_name    VARCHAR(50)  NULL,
    MODIFY COLUMN phone_number VARCHAR(20)  NULL,
    MODIFY COLUMN address      VARCHAR(100) NULL;

ALTER TABLE pharmacy.users
    DROP COLUMN username,
    DROP COLUMN phone;


