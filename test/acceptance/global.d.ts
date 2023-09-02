import { StartedDockerComposeEnvironment } from 'testcontainers';

declare global {
  var environment: StartedDockerComposeEnvironment;
}
