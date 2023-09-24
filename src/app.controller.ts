import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  constructor() {}

  @Get()
  index(): string {
    return `
    <ul>
      <li><a href="/graphql">graphql playground</a></li>
      <li><a href="/integration/google/link">Link google</a></li>
      <li><a href="/integration/google/tasks?email=">test google tasks</a></li>
    </ul>
    `;
  }
}
