import { MigrationInterface, QueryRunner } from "typeorm";

export class AddList1693821819742 implements MigrationInterface {
    name = 'AddList1693821819742'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "list" ("id" SERIAL NOT NULL, "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying NOT NULL, CONSTRAINT "PK_d8feafd203525d5f9c37b3ed3b9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "todo" ADD "list_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "todo" ADD CONSTRAINT "FK_1a5448d48035763b9dbab86555b" FOREIGN KEY ("list_id") REFERENCES "list"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "todo" DROP CONSTRAINT "FK_1a5448d48035763b9dbab86555b"`);
        await queryRunner.query(`ALTER TABLE "todo" DROP COLUMN "list_id"`);
        await queryRunner.query(`DROP TABLE "list"`);
    }

}
