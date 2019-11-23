import {MigrationInterface, QueryRunner} from "typeorm";

export class myInit1574200289791 implements MigrationInterface {
    name = 'myInit1574200289791'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "automations_zones" ("onEnter" boolean NOT NULL, "onLeave" boolean NOT NULL, "zoneId" uuid NOT NULL, "automationId" uuid NOT NULL, CONSTRAINT "PK_dccfdc4cdd08883846dba110018" PRIMARY KEY ("zoneId", "automationId"))`, undefined);
        await queryRunner.query(`ALTER TABLE "automations_zones" ADD CONSTRAINT "FK_efedee9b52608af8e8f20fb3659" FOREIGN KEY ("zoneId") REFERENCES "zones"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "automations_zones" ADD CONSTRAINT "FK_a5c5bcec05f0a1c7b31ee4d5e5d" FOREIGN KEY ("automationId") REFERENCES "automations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "automations_zones" DROP CONSTRAINT "FK_a5c5bcec05f0a1c7b31ee4d5e5d"`, undefined);
        await queryRunner.query(`ALTER TABLE "automations_zones" DROP CONSTRAINT "FK_efedee9b52608af8e8f20fb3659"`, undefined);
        await queryRunner.query(`DROP TABLE "automations_zones"`, undefined);
    }

}
