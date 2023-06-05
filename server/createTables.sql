CREATE TABLE `users`(
    `uuid` VARCHAR(36) NOT NULL,
    `username` BIGINT NOT NULL,
    `password` BIGINT NOT NULL
);
ALTER TABLE
    `users` ADD PRIMARY KEY(`uuid`);
CREATE TABLE `aid_requests`(
    `uuid` VARCHAR(36) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `number` VARCHAR(20) NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `description` TEXT NOT NULL,
    `amount` BIGINT NOT NULL,
    `status` VARCHAR(20) NOT NULL
);
ALTER TABLE
    `aid_requests` ADD PRIMARY KEY(`uuid`);
CREATE TABLE `donations`(
    `uuid` VARCHAR(36) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `number` VARCHAR(20) NOT NULL,
    `beneficiary_uuid` VARCHAR(36) NOT NULL,
    `beneficiary_name` VARCHAR(255) NOT NULL,
    `amount` BIGINT NOT NULL
);
ALTER TABLE
    `donations` ADD PRIMARY KEY(`uuid`);
ALTER TABLE
    `donations` ADD CONSTRAINT `donations_beneficiary_uuid_foreign` FOREIGN KEY(`beneficiary_uuid`) REFERENCES `aid_requests`(`uuid`);
ALTER TABLE
    `donations` ADD CONSTRAINT `donations_beneficiary_name_foreign` FOREIGN KEY(`beneficiary_name`) REFERENCES `aid_requests`(`name`);