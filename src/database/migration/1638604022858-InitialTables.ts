import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialTables1638604022858 implements MigrationInterface {
    name = 'InitialTables1638604022858';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`Reminders\` (\`reminder_number\` int NOT NULL UNIQUE AUTO_INCREMENT, \`description\` varchar(255) NOT NULL, \`created_at\` date NOT NULL, \`status_completed\` tinyint DEFAULT 0, PRIMARY KEY (\`reminder_number\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Users\` (\`id\` varchar(36) NOT NULL, \`email\` varchar(255) NOT NULL UNIQUE, \`name\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`account_type_admin\` int NOT NULL DEFAULT 1, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`Users\``);
        await queryRunner.query(`DROP TABLE \`Reminders\``);
    }

}
