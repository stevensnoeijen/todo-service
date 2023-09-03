import request from 'supertest-graphql';
import gql from 'graphql-tag';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { Repository } from 'typeorm';
import sleep from 'sleep-promise';

import { AppModule } from '../../src/app.module';
import { TodoEntity } from '../../src/todo/todo.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('Graphql', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const testingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = testingModule.createNestApplication();
    await app.init();

    // seeding database
    const todoRepository = testingModule.get(getRepositoryToken(TodoEntity));
    await todoRepository.save(
      Object.assign(new TodoEntity(), {
        title: 'test',
      }),
    );
  });

  afterAll(async () => {
    await app.close();
  });

  describe('query todo', () => {
    it('should return 1 todo when available', async () => {
      const { data } = await request<any>(app.getHttpServer())
        .query(gql`
          {
            todo(id: 1) {
              id
              title
            }
          }
        `)
        .expectNoErrors();

      expect(data.todo).toBeDefined();
    });

    it('should return null and error when todo does not exists', async () => {
      const { data, errors } = await request<any>(app.getHttpServer())
        .query(gql`
          {
            todo(id: 2) {
              id
              title
            }
          }
        `)
        .end();

      expect(data).toBeNull();
      expect(errors).toBeDefined();
    });
  });

  describe('query todos', () => {
    it("should return 1 todo's when table has one record", async () => {
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

      expect(data.todos.edges).toHaveLength(1);
    });
  });

  it("should return 0 todo's when filtering on non-existing title", async () => {
    const { data } = await request<any>(app.getHttpServer())
      .query(
        gql`
          query todos($filter: TodoFilter!) {
            todos(filter: $filter) {
              edges {
                node {
                  id
                  title
                }
              }
            }
          }
        `,
        {
          filter: {
            title: {
              eq: 'spongebob',
            },
          },
        },
      )
      .expectNoErrors();

    expect(data.todos.edges).toHaveLength(0);
  });
});
