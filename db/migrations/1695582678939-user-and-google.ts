import { MigrationInterface, QueryRunner } from "typeorm";

export class UserAndGoogle1695582678939 implements MigrationInterface {
    name = 'UserAndGoogle1695582678939'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "googleRefreshToken" character varying, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "todo" ADD "google_id" character varying`);
        await queryRunner.query(`ALTER TABLE "list" ADD "google_id" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "list" DROP COLUMN "google_id"`);
        await queryRunner.query(`ALTER TABLE "todo" DROP COLUMN "google_id"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
