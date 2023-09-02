import request from 'supertest-graphql';
import gql from 'graphql-tag';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';

import { AppModule } from '../../src/app.module';

describe('Graphql', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('query todos', () => {
    it("should return 0 todo's when table is empty", async () => {
      const { data } = await request<any>(app.getHttpServer())
        .query(gql`
          {
            todos {
              edges {
                node {
                  id
                  title
                }
              }
            }
          }
        `)
        .expectNoErrors();

      expect(data.todos.edges).toHaveLength(0);
    });
  });
});
