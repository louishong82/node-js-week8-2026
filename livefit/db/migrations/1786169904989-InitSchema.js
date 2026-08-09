/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 * @typedef {import('typeorm').QueryRunner} QueryRunner
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
module.exports = class InitSchema1786169904989 {
    name = 'InitSchema1786169904989'

    /**
     * @param {QueryRunner} queryRunner
     */
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "COURSE" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100) NOT NULL, "description" text NOT NULL, "start_at" TIMESTAMP NOT NULL, "end_at" TIMESTAMP NOT NULL, "max_participants" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" uuid, "skill_id" uuid, CONSTRAINT "PK_1dcd712a4d39dcfd9d46ca0ae11" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "SKILL" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, CONSTRAINT "UQ_0780a3ef1d521b8bee1c9b240de" UNIQUE ("name"), CONSTRAINT "PK_90109ddb53b4c7cf8efe1efad0d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "USER" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "email" character varying(320) NOT NULL, "role" character varying(20) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_c090db0477be7a25259805e37c2" UNIQUE ("email"), CONSTRAINT "PK_480564dbef3c7391661ce3b9d5c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "COURSE" ADD CONSTRAINT "FK_7c9837d128ab474cb3d409b448d" FOREIGN KEY ("user_id") REFERENCES "USER"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "COURSE" ADD CONSTRAINT "FK_10d952a5e55998cf12f448fcfab" FOREIGN KEY ("skill_id") REFERENCES "SKILL"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    /**
     * @param {QueryRunner} queryRunner
     */
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "COURSE" DROP CONSTRAINT "FK_10d952a5e55998cf12f448fcfab"`);
        await queryRunner.query(`ALTER TABLE "COURSE" DROP CONSTRAINT "FK_7c9837d128ab474cb3d409b448d"`);
        await queryRunner.query(`DROP TABLE "USER"`);
        await queryRunner.query(`DROP TABLE "SKILL"`);
        await queryRunner.query(`DROP TABLE "COURSE"`);
    }
}
