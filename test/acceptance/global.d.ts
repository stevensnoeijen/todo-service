import { StartedTestContainer } from 'testcontainers';

declare global {
  var db: StartedTestContainer;
}
