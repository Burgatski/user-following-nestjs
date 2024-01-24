import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedDb1704622364873 implements MigrationInterface {
  name = 'SeedDb1704622364873';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO tags (name) VALUES ('dragons'), ('coffe'), ('nestjs')`,
    );

    // password: 123
    await queryRunner.query(
      `INSERT INTO users (username, email, password) VALUES('foo', 'coffe@gmail.com', '$2b$10$h3PYwy5LSMesV/ozlxCP9u9Mwxee7Y8PlxL2MhdQNvzUuouyKMpSC')`,
    );

    await queryRunner.query(
      `INSERT INTO articles (slug, title, description, body, "tagList", "authorId") VALUES ('first-article', 'First article', 'First article desc', 'First article body', 'coffee,dragons', 1)`,
    );

    await queryRunner.query(
      `INSERT INTO articles (slug, title, description, body, "tagList", "authorId") VALUES ('second-article', 'Second article', 'Second article desc', 'Second article body', 'coffee,nestjs', 1)`,
    );
  }
  public async down(): Promise<void> {}
}
