import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { google } from 'googleapis';
import { Repository } from 'typeorm';

import { UserEntity } from '../../user/user.entity';
import { ListEntity } from '../../list/list.entity';
import { TodoEntity } from 'src/todo/todo.entity';

@Injectable()
export class GoogleService {
  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(ListEntity)
    private listRepository: Repository<ListEntity>,
    @InjectRepository(TodoEntity)
    private todoRepository: Repository<TodoEntity>,
  ) {}

  private getTasksClient(user: UserEntity) {
    const auth = new google.auth.OAuth2({
      clientId: this.configService.getOrThrow('GOOGLE_OAUTH_CLIENT_ID'),
      clientSecret: this.configService.getOrThrow('GOOGLE_OAUTH_CLIENT_SECRET'),
      redirectUri: this.configService.getOrThrow(
        'GOOGLE_OAUTH_CLIENT_CALLBACK_URL',
      ),
    });
    auth.setCredentials({
      refresh_token: user.googleRefreshToken,
    });

    return google.tasks({
      version: 'v1',
      auth,
    });
  }

  /**
   * Sync google list and tasks to local db
   */
  async syncTasks(user: UserEntity) {
    const tasksClient = this.getTasksClient(user);

    const listsResult = await tasksClient.tasklists.list();

    const allItems = await Promise.all(
      listsResult.data.items.map(async (list) => {
        const tasksResult = await tasksClient.tasks.list({
          tasklist: list.id,
          showCompleted: true,
          showDeleted: true,
          showHidden: true,
        });
        return { list: list, items: tasksResult.data.items };
      }),
    );

    // create items
    for (const { list, items } of allItems) {
      let dbList = await this.listRepository.findOneBy({
        googleId: list.id!,
      });

      if (dbList == null) {
        dbList = this.listRepository.create({
          googleId: list.id!,
        });
      }
      dbList.title = list.title;
      dbList = await this.listRepository.save(dbList);

      for (const item of items) {
        let dbItem = await this.todoRepository.findOneBy({
          list: { id: dbList.id },
          googleId: item.id!,
        });

        if (dbItem == null) {
          dbItem = this.todoRepository.create({
            list: { id: dbList.id },
            googleId: item.id!,
          });
        }
        dbItem.title = item.title;
        if (item.completed != null) {
          dbItem.completed = new Date(item.completed);
        }

        await this.todoRepository.save(dbItem);
      }
    }

    return allItems;
  }
}
