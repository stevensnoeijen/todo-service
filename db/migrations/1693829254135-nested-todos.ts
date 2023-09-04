import { MigrationInterface, QueryRunner } from "typeorm";

export class NestedTodos1693829254135 implements MigrationInterface {
    name = 'NestedTodos1693829254135'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "todo" ADD "parent_id" integer`);
        await queryRunner.query(`ALTER TABLE "todo" ADD CONSTRAINT "FK_aba07d7ce87c7154eb14c76d3fc" FOREIGN KEY ("parent_id") REFERENCES "todo"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "todo" DROP CONSTRAINT "FK_aba07d7ce87c7154eb14c76d3fc"`);
        await queryRunner.query(`ALTER TABLE "todo" DROP COLUMN "parent_id"`);
    }

}
