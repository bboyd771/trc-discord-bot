javascriptimport { Listener } from '@sapphire/framework';
import { CHANNELS } from '../config/channels.js';

export class MemberJoinListener extends Listener {
  constructor(context, options) {
    super(context, {
      ...options,
      event: 'guildMemberAdd'
    });
  }

  async run(member) {
    const welcomeChannel = member.guild.channels.cache.find(
      c => c.name === CHANNELS.WELCOME_RULES
    );
    
    if (!welcomeChannel) return;

    await welcomeChannel.send(`Hi ${member}, welcome to our TRC community.

You've joined Boston's most active music creator network. We connect 2,800+ monthly creators across our 960 Mass Ave and 55 Morrissey locations.

**Get started:**
- Read #welcome-and-rules for guidelines
- Introduce yourself in #introductions
- Join daily chat in #general-chat
- Check #studio-updates for facility news

**Need help?** Ask in #community-support or message @TRC Staff

This is a professional community for creators building sustainable careers. Looking forward to seeing what you're working on!`);

    // Assign default role
    const defaultRole = member.guild.roles.cache.find(r => r.name === 'Community Member');
    if (defaultRole) {
      await member.roles.add(defaultRole);
    }
  }
}
