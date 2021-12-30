import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialTables1638604022858 implements MigrationInterface {
    name = 'InitialTables1638604022858';

    public async up(queryRunner: QueryRunner): Promise<void> {
        // await queryRunner.query(`CREATE TABLE \`Reminders\` (\`reminder_number\` int NOT NULL UNIQUE, \`description\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`reminder_number\`)) ENGINE=InnoDB`);
        // await queryRunner.query(`CREATE TABLE \`Locations\` (\`id\` varchar(36) NOT NULL, \`location_name\` varchar(255) NOT NULL, \`country\` varchar(255) NOT NULL, \`is_active\` tinyint NOT NULL, \`created_by\` varchar(255) NULL, \`updated_by\` varchar(255) NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Users\` (\`id\` varchar(36) NOT NULL, \`email\` varchar(255) NOT NULL UNIQUE, \`name\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`account_type_admin\` int NOT NULL DEFAULT 1, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        // await queryRunner.query(`CREATE TABLE \`UsersProfile\` (\`id\` varchar(36) NOT NULL, \`emp_id\` varchar(255) NOT NULL, \`department\` varchar(255) NOT NULL, \`location\` varchar(255) NOT NULL, \`designation\` tinyint NULL, \`joining_date\` varchar(255) NULL, \`display_picture\` varchar(255) NULL, \`created_by\` varchar(255) NULL, \`updated_by\` varchar(255) NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // await queryRunner.query(`DROP TABLE \`UsersProfile\``);
        await queryRunner.query(`DROP TABLE \`Users\``);
        // await queryRunner.query(`DROP TABLE \`Locations\``);
        // await queryRunner.query(`DROP TABLE \`Reminders\``);
    }

}
