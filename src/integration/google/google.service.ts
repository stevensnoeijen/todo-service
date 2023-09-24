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

  /**
   * Sync google list and tasks to local db
   */
  async syncTasks(user: UserEntity) {
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

    const tasks = google.tasks({
      version: 'v1',
      auth,
    });

    const listsResult = await tasks.tasklists.list();

    const allItems = await Promise.all(
      listsResult.data.items.map(async (list) => {
        const tasksResult = await tasks.tasks.list({
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
        dbList = await this.listRepository.create({
          googleId: list.id!,
        });
      }
      dbList.title = list.title;
      dbList = await this.listRepository.save(dbList);

      for (const item of items) {
        let dbItem = await this.todoRepository.findOneBy({
          list: dbList,
          googleId: list.id!,
        });

        if (dbItem == null) {
          dbItem = await this.todoRepository.create({
            list: dbList,
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
