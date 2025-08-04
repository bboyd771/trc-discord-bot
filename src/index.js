javascriptimport { SapphireClient } from '@sapphire/framework';
import { GatewayIntentBits, Partials } from 'discord.js';
import { config } from 'dotenv';

// Load environment variables
config();

const client = new SapphireClient({
  defaultPrefix: '!',
  regexPrefix: /^(hey +)?bot[,! ]/i,
  caseInsensitiveCommands: true,
  logger: {
    level: process.env.NODE_ENV === 'production' ? 'info' : 'debug'
  },
  shards: 'auto',
  intents: [
    GatewayIntentBits.DirectMessageReactions,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.GuildBans,
    GatewayIntentBits.GuildEmojisAndStickers,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.MessageContent
  ],
  partials: [Partials.Channel],
  loadMessageCommandListeners: true
});

const main = async () => {
  try {
    client.logger.info('Logging in to Discord...');
    await client.login(process.env.DISCORD_TOKEN);
    client.logger.info('TRC Discord Bot successfully logged in!');
  } catch (error) {
    client.logger.fatal('Failed to login to Discord:', error);
    client.destroy();
    process.exit(1);
  }
};

// Health check endpoint for Railway
const http = await import('http');
const server = http.createServer((req, res) => {
  if (req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Bot is running');
  } else {
    res.writeHead(404);
    res.end('Not found');
  }
});

server.listen(process.env.PORT || 3000);

main();
