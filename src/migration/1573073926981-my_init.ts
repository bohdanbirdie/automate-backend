import {MigrationInterface, QueryRunner} from "typeorm";

export class myInit1573073926981 implements MigrationInterface {
    name = 'myInit1573073926981'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "users" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "updated_at"`, undefined);
    }

}
