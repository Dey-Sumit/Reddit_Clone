import {MigrationInterface, QueryRunner} from "typeorm";

export class createUserTable1609344368582 implements MigrationInterface {
    name = 'createUserTable1609344368582'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "subs" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "title" character varying NOT NULL, "description" text, "imageUrn" character varying, "bannerUrn" character varying, "username" character varying, CONSTRAINT "UQ_2ae46b179b70ab8179597adb8c0" UNIQUE ("name"), CONSTRAINT "PK_c2311ff9e741af88151e0aa2299" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_2ae46b179b70ab8179597adb8c" ON "subs" ("name") `);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "createAt"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "updateAt"`);
        await queryRunner.query(`ALTER TABLE "posts" DROP COLUMN "createAt"`);
        await queryRunner.query(`ALTER TABLE "posts" DROP COLUMN "updateAt"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "users" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "posts" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "posts" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "subs" ADD CONSTRAINT "FK_4520ae7b26f68a13ec3e96dbbba" FOREIGN KEY ("username") REFERENCES "users"("username") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "posts" ADD CONSTRAINT "FK_cca21672314ce54982a6dd5d121" FOREIGN KEY ("subName") REFERENCES "subs"("name") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts" DROP CONSTRAINT "FK_cca21672314ce54982a6dd5d121"`);
        await queryRunner.query(`ALTER TABLE "subs" DROP CONSTRAINT "FK_4520ae7b26f68a13ec3e96dbbba"`);
        await queryRunner.query(`ALTER TABLE "posts" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "posts" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "posts" ADD "updateAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "posts" ADD "createAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "users" ADD "updateAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "users" ADD "createAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`DROP INDEX "IDX_2ae46b179b70ab8179597adb8c"`);
        await queryRunner.query(`DROP TABLE "subs"`);
    }

}
