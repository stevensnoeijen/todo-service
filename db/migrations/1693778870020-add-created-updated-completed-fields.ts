import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCreatedUpdatedCompletedFields1693778870020 implements MigrationInterface {
    name = 'AddCreatedUpdatedCompletedFields1693778870020'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "todo" ADD "created" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "todo" ADD "updated" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "todo" ADD "completed" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "todo" DROP COLUMN "completed"`);
        await queryRunner.query(`ALTER TABLE "todo" DROP COLUMN "updated"`);
        await queryRunner.query(`ALTER TABLE "todo" DROP COLUMN "created"`);
    }

}
