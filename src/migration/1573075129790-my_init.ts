import {MigrationInterface, QueryRunner} from "typeorm";

export class myInit1573075129790 implements MigrationInterface {
    name = 'myInit1573075129790'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "zones" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "identifier" character varying(100) NOT NULL, "radius" numeric NOT NULL, "latitude" numeric NOT NULL, "longitude" numeric NOT NULL, "notifyOnEntry" boolean NOT NULL, "notifyOnExit" boolean NOT NULL, "notifyOnDwell" boolean NOT NULL, "loiteringDelay" integer, CONSTRAINT "PK_880484a43ca311707b05895bd4a" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "zones_users_users" ("zonesId" uuid NOT NULL, "usersId" uuid NOT NULL, CONSTRAINT "PK_b0f0c3adb6ec30843d2dd2ea3af" PRIMARY KEY ("zonesId", "usersId"))`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_1e61db451be2135a4e6c194dde" ON "zones_users_users" ("zonesId") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_b7de614d671ed4daff0b58b211" ON "zones_users_users" ("usersId") `, undefined);
        await queryRunner.query(`ALTER TABLE "zones_users_users" ADD CONSTRAINT "FK_1e61db451be2135a4e6c194dde0" FOREIGN KEY ("zonesId") REFERENCES "zones"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "zones_users_users" ADD CONSTRAINT "FK_b7de614d671ed4daff0b58b2112" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "zones_users_users" DROP CONSTRAINT "FK_b7de614d671ed4daff0b58b2112"`, undefined);
        await queryRunner.query(`ALTER TABLE "zones_users_users" DROP CONSTRAINT "FK_1e61db451be2135a4e6c194dde0"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_b7de614d671ed4daff0b58b211"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_1e61db451be2135a4e6c194dde"`, undefined);
        await queryRunner.query(`DROP TABLE "zones_users_users"`, undefined);
        await queryRunner.query(`DROP TABLE "zones"`, undefined);
    }

}
