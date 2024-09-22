import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserEntity1726681472772 implements MigrationInterface {
  name = 'AddUserEntity1726681472772';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" ("user_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "login" character varying NOT NULL, "phone" character varying(10) NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "passwordHash" character varying NOT NULL, "passwordSalt" character varying NOT NULL, "balance" character varying NOT NULL DEFAULT '0', "isDeleted" boolean DEFAULT false, CONSTRAINT "PK_758b8ce7c18b9d347461b30228d" PRIMARY KEY ("user_id")); COMMENT ON COLUMN "user"."user_id" IS 'User UUID'; COMMENT ON COLUMN "user"."login" IS 'User login'; COMMENT ON COLUMN "user"."phone" IS 'User phone number'; COMMENT ON COLUMN "user"."firstName" IS 'User firstName'; COMMENT ON COLUMN "user"."lastName" IS 'User lastName'; COMMENT ON COLUMN "user"."passwordHash" IS 'User hashed password'; COMMENT ON COLUMN "user"."passwordSalt" IS 'password salt'; COMMENT ON COLUMN "user"."balance" IS 'User password'; COMMENT ON COLUMN "user"."isDeleted" IS 'is deleted userAccount'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
