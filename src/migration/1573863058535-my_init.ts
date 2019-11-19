import {MigrationInterface, QueryRunner} from "typeorm";

export class myInit1573863058535 implements MigrationInterface {
    name = 'myInit1573863058535'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "automations" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "name" character varying(100) NOT NULL, "description" character varying(200) NOT NULL, CONSTRAINT "PK_34c2cc382fc780ea36f7c478192" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "events" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "name" character varying(100) NOT NULL, CONSTRAINT "PK_40731c7151fe4be3116e45ddf73" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "automations_events" ("order" numeric NOT NULL, "eventId" uuid NOT NULL, "automationId" uuid NOT NULL, CONSTRAINT "PK_de02156e8fdb2201f6784b21fe8" PRIMARY KEY ("eventId", "automationId"))`, undefined);
        await queryRunner.query(`CREATE TABLE "zones_zones_automations" ("zonesId" uuid NOT NULL, "automationsId" uuid NOT NULL, CONSTRAINT "PK_3bf3ecb30d3bc912aaf9dfcc8ee" PRIMARY KEY ("zonesId", "automationsId"))`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_9b0e2ab8702c2d85a226835f4b" ON "zones_zones_automations" ("zonesId") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_a92bfb1f5c4bf81a3e7b030e2f" ON "zones_zones_automations" ("automationsId") `, undefined);
        await queryRunner.query(`CREATE TABLE "automations_users_users" ("automationsId" uuid NOT NULL, "usersId" uuid NOT NULL, CONSTRAINT "PK_3a8c4d1b111a63640286bbfb161" PRIMARY KEY ("automationsId", "usersId"))`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_67cecca1dae20fc68c23c872d8" ON "automations_users_users" ("automationsId") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_e6e34126e179e0ddda46a7426b" ON "automations_users_users" ("usersId") `, undefined);
        await queryRunner.query(`CREATE TABLE "events_users_users" ("eventsId" uuid NOT NULL, "usersId" uuid NOT NULL, CONSTRAINT "PK_19f73b8d7cde9d2d720dc63d641" PRIMARY KEY ("eventsId", "usersId"))`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_d76969863bc119c557f3114725" ON "events_users_users" ("eventsId") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_a3fcb2c2f04d5bce01975994e0" ON "events_users_users" ("usersId") `, undefined);
        await queryRunner.query(`ALTER TABLE "automations_events" ADD CONSTRAINT "FK_e23bb30bbe7c2d25870e9e12d8f" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "automations_events" ADD CONSTRAINT "FK_dde647dcb1e5a4588037736115f" FOREIGN KEY ("automationId") REFERENCES "automations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "zones_zones_automations" ADD CONSTRAINT "FK_9b0e2ab8702c2d85a226835f4b9" FOREIGN KEY ("zonesId") REFERENCES "zones"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "zones_zones_automations" ADD CONSTRAINT "FK_a92bfb1f5c4bf81a3e7b030e2f4" FOREIGN KEY ("automationsId") REFERENCES "automations"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "automations_users_users" ADD CONSTRAINT "FK_67cecca1dae20fc68c23c872d8e" FOREIGN KEY ("automationsId") REFERENCES "automations"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "automations_users_users" ADD CONSTRAINT "FK_e6e34126e179e0ddda46a7426b3" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "events_users_users" ADD CONSTRAINT "FK_d76969863bc119c557f3114725d" FOREIGN KEY ("eventsId") REFERENCES "events"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "events_users_users" ADD CONSTRAINT "FK_a3fcb2c2f04d5bce01975994e0d" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "events_users_users" DROP CONSTRAINT "FK_a3fcb2c2f04d5bce01975994e0d"`, undefined);
        await queryRunner.query(`ALTER TABLE "events_users_users" DROP CONSTRAINT "FK_d76969863bc119c557f3114725d"`, undefined);
        await queryRunner.query(`ALTER TABLE "automations_users_users" DROP CONSTRAINT "FK_e6e34126e179e0ddda46a7426b3"`, undefined);
        await queryRunner.query(`ALTER TABLE "automations_users_users" DROP CONSTRAINT "FK_67cecca1dae20fc68c23c872d8e"`, undefined);
        await queryRunner.query(`ALTER TABLE "zones_zones_automations" DROP CONSTRAINT "FK_a92bfb1f5c4bf81a3e7b030e2f4"`, undefined);
        await queryRunner.query(`ALTER TABLE "zones_zones_automations" DROP CONSTRAINT "FK_9b0e2ab8702c2d85a226835f4b9"`, undefined);
        await queryRunner.query(`ALTER TABLE "automations_events" DROP CONSTRAINT "FK_dde647dcb1e5a4588037736115f"`, undefined);
        await queryRunner.query(`ALTER TABLE "automations_events" DROP CONSTRAINT "FK_e23bb30bbe7c2d25870e9e12d8f"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_a3fcb2c2f04d5bce01975994e0"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_d76969863bc119c557f3114725"`, undefined);
        await queryRunner.query(`DROP TABLE "events_users_users"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_e6e34126e179e0ddda46a7426b"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_67cecca1dae20fc68c23c872d8"`, undefined);
        await queryRunner.query(`DROP TABLE "automations_users_users"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_a92bfb1f5c4bf81a3e7b030e2f"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_9b0e2ab8702c2d85a226835f4b"`, undefined);
        await queryRunner.query(`DROP TABLE "zones_zones_automations"`, undefined);
        await queryRunner.query(`DROP TABLE "automations_events"`, undefined);
        await queryRunner.query(`DROP TABLE "events"`, undefined);
        await queryRunner.query(`DROP TABLE "automations"`, undefined);
    }

}
