import {MigrationInterface, QueryRunner} from "typeorm";

export class myInit1573332089182 implements MigrationInterface {
    name = 'myInit1573332089182'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "zones" ADD "uiId" character varying(100) NOT NULL`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "zones" DROP COLUMN "uiId"`, undefined);
    }

}
