/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 * @typedef {import('typeorm').QueryRunner} QueryRunner
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
module.exports = class InitSchema1786244315910 {
    name = 'InitSchema1786244315910'

    /**
     * @param {QueryRunner} queryRunner
     */
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "CLASS" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, CONSTRAINT "PK_f7e171cf1a8b2d418f1fd182456" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "GRADE" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "score" integer NOT NULL, "student_id" uuid NOT NULL, "subject_id" uuid NOT NULL, CONSTRAINT "PK_bd0bb90149430debd6371dd718a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "STUDENT" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "class_id" uuid NOT NULL, CONSTRAINT "PK_85f0e0a0ccd38f6d8ea17f5e9b1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "SUBJECT" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, CONSTRAINT "PK_f4bd852a75dd2062e5d01e3d824" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "GRADE" ADD CONSTRAINT "FK_92c82e6528220f8ca6b202c8fef" FOREIGN KEY ("student_id") REFERENCES "STUDENT"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "GRADE" ADD CONSTRAINT "FK_d173d08c8481c8331a3cb48b715" FOREIGN KEY ("subject_id") REFERENCES "SUBJECT"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "STUDENT" ADD CONSTRAINT "FK_4fb1ca1a74779f553a538b83e26" FOREIGN KEY ("class_id") REFERENCES "CLASS"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    /**
     * @param {QueryRunner} queryRunner
     */
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "STUDENT" DROP CONSTRAINT "FK_4fb1ca1a74779f553a538b83e26"`);
        await queryRunner.query(`ALTER TABLE "GRADE" DROP CONSTRAINT "FK_d173d08c8481c8331a3cb48b715"`);
        await queryRunner.query(`ALTER TABLE "GRADE" DROP CONSTRAINT "FK_92c82e6528220f8ca6b202c8fef"`);
        await queryRunner.query(`DROP TABLE "SUBJECT"`);
        await queryRunner.query(`DROP TABLE "STUDENT"`);
        await queryRunner.query(`DROP TABLE "GRADE"`);
        await queryRunner.query(`DROP TABLE "CLASS"`);
    }
}
