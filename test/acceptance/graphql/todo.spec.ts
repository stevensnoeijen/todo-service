import request from 'supertest-graphql';
import gql from 'graphql-tag';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { DeepPartial, Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

import { AppModule } from '../../../src/app.module';
import { TodoEntity } from '../../../src/todo/todo.entity';
import { ListEntity } from '../../../src/list/list.entity';

describe('Graphql todo', () => {
  let app: INestApplication;
  let listRepository: Repository<ListEntity>;
  let todoRepository: Repository<TodoEntity>;
  let defaultList: ListEntity;

  const createDbTodo = async (props?: DeepPartial<TodoEntity>) => {
    return todoRepository.save(
      Object.assign(new TodoEntity(), {
        title: 'created',
        list: defaultList,
        ...props,
      }),
    );
  };

  beforeAll(async () => {
    const testingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = testingModule.createNestApplication();
    await app.init();

    // seeding database
    listRepository = testingModule.get(getRepositoryToken(ListEntity));
    defaultList = await listRepository.save({
      title: 'default',
    });
    todoRepository = testingModule.get(getRepositoryToken(TodoEntity));
    await createDbTodo({
      title: 'Go to work',
    });
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

    it("should return 0 todo's when filtering on non-existing title", async () => {
      const { data } = await request<any>(app.getHttpServer())
        .query(
          gql`
            query ($filter: TodoFilter!) {
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
                eq: 'No',
              },
            },
          },
        )
        .expectNoErrors();

      expect(data.todos.edges).toHaveLength(0);
    });

    it('should return 1 todo when filtering on completed todo', async () => {
      await createDbTodo({
        completed: new Date(),
      });

      const { data } = await request<any>(app.getHttpServer())
        .query(
          gql`
            query ($filter: TodoFilter!) {
              todos(filter: $filter) {
                edges {
                  node {
                    id
                    title
                    created
                    updated
                    completed
                  }
                }
              }
            }
          `,
          {
            filter: {
              completed: {
                isNot: null,
              },
            },
          },
        )
        .expectNoErrors();

      expect(data.todos.edges).toHaveLength(1);
    });
  });

  describe('mutation createOneTodo', () => {
    it('should create todo', async () => {
      const { data } = await request<any>(app.getHttpServer())
        .mutate(
          gql`
            mutation ($input: CreateOneTodoInput!) {
              createOneTodo(input: $input) {
                id
                title
              }
            }
          `,
          {
            input: {
              todo: {
                title: 'Nothing',
                completed: new Date(),
                list: { id: defaultList.id },
              },
            },
          },
        )
        .expectNoErrors();

      expect(data.createOneTodo).toBeDefined();
      const createdTodo = await todoRepository.findOne({
        where: {
          id: data.createOneTodo.id,
        },
      });
      expect(createdTodo).not.toBeNull();
      expect(createdTodo.completed).not.toBeNull();
    });
  });

  describe('mutation createManyTodos', () => {
    it('should create todo', async () => {
      const { data } = await request<any>(app.getHttpServer())
        .mutate(
          gql`
            mutation ($input: CreateManyTodosInput!) {
              createManyTodos(input: $input) {
                id
                title
              }
            }
          `,
          {
            input: {
              todos: [
                {
                  title: 'Nothing',
                  list: { id: defaultList.id },
                },
              ],
            },
          },
        )
        .expectNoErrors();

      expect(data.createManyTodos).toHaveLength(1);
      expect(
        await todoRepository.exist({
          where: {
            id: data.createManyTodos[0].id,
          },
        }),
      ).toBeTruthy();
    });
  });

  describe('mutation updateOneTodo', () => {
    it('should update todo', async () => {
      const createdEntity = await createDbTodo();

      const { data } = await request<any>(app.getHttpServer())
        .mutate(
          gql`
            mutation ($input: UpdateOneTodoInput!) {
              updateOneTodo(input: $input) {
                id
                title
              }
            }
          `,
          {
            input: {
              id: createdEntity.id,
              update: {
                title: 'updated',
              },
            },
          },
        )
        .expectNoErrors();

      expect(data.updateOneTodo).toBeDefined();
      const updatedEntity = await todoRepository.findOne({
        where: {
          id: data.updateOneTodo.id,
        },
      });
      expect(updatedEntity.title).toEqual('updated');
    });
  });

  describe('mutation updateManyTodos', () => {
    it('should update todo', async () => {
      const createdEntity = await createDbTodo();

      const { data } = await request<any>(app.getHttpServer())
        .mutate(
          gql`
            mutation ($input: UpdateManyTodosInput!) {
              updateManyTodos(input: $input) {
                updatedCount
              }
            }
          `,
          {
            input: {
              filter: {
                id: {
                  eq: createdEntity.id,
                },
              },
              update: {
                title: 'updated',
              },
            },
          },
        )
        .expectNoErrors();

      expect(data.updateManyTodos.updatedCount).toEqual(1);
      const updatedEntity = await todoRepository.findOne({
        where: {
          id: createdEntity.id,
        },
      });
      expect(updatedEntity.title).toEqual('updated');
    });
  });

  describe('mutation deleteOneTodo', () => {
    it('should delete one todo', async () => {
      const createdEntity = await createDbTodo();

      const { data } = await request<any>(app.getHttpServer())
        .mutate(
          gql`
            mutation ($input: DeleteOneTodoInput!) {
              deleteOneTodo(input: $input) {
                id
              }
            }
          `,
          {
            input: {
              id: createdEntity.id,
            },
          },
        )
        .expectNoErrors();

      expect(data.deleteOneTodo.id).toBeNull();
      const deletedEntity = await todoRepository.findOne({
        where: {
          id: createdEntity.id,
        },
      });
      expect(deletedEntity).toBeNull();
    });
  });

  describe('mutation deleteManyTodos', () => {
    it('should delete one todo', async () => {
      const createdEntity = await createDbTodo();

      const { data } = await request<any>(app.getHttpServer())
        .mutate(
          gql`
            mutation ($input: DeleteManyTodosInput!) {
              deleteManyTodos(input: $input) {
                deletedCount
              }
            }
          `,
          {
            input: {
              filter: {
                id: {
                  eq: createdEntity.id,
                },
              },
            },
          },
        )
        .expectNoErrors();

      expect(data.deleteManyTodos.deletedCount).toEqual(1);
      const deletedEntity = await todoRepository.findOne({
        where: {
          id: createdEntity.id,
        },
      });
      expect(deletedEntity).toBeNull();
    });
  });
});
