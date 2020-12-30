import {MigrationInterface, QueryRunner} from "typeorm";

export class createCommentTable1609346292191 implements MigrationInterface {
    name = 'createCommentTable1609346292191'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE INDEX "IDX_8e7297165a3d53fa13b720bb11" ON "comments" ("identifier") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_8e7297165a3d53fa13b720bb11"`);
    }

}
