import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateFollows1705841040796 implements MigrationInterface {
  name = 'CreateFollows1705841040796';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "follows" RENAME COLUMN "following" TO "followingId"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "follows" RENAME COLUMN "followingId" TO "following"`,
    );
  }
}
