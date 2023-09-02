import { DockerComposeEnvironment } from 'testcontainers';

export default async function () {
  const dockerCompose = new DockerComposeEnvironment(
    './',
    'docker-compose.yml',
  );
  global.environment = await dockerCompose.up();
}
