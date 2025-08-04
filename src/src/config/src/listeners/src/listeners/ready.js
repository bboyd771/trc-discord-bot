javascriptimport { Listener } from '@sapphire/framework';

export class ReadyListener extends Listener {
  constructor(context, options) {
    super(context, {
      ...options,
      once: true,
      event: 'ready'
    });
  }

  run() {
    this.container.logger.info(`Successfully logged in as ${this.container.client.user.tag}`);
    this.container.logger.info('TRC Discord Bot is ready to serve the community!');
  }
}
