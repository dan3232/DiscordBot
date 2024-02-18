const Discord = require("discord.js");

module.exports = {
    data: new Discord.SlashCommandBuilder()
        .setName("avatar")
        .setDescription("Enseña tu avatar en discord")
        .addUserOption((option) => 
            option
                .setName("user")
                .setDescription("Usuario cuyo avatar quieres msotrar")
        ),
    execute: async (interaction) => {
        const { user, client, guild } = interaction;
        const imagePropierties = { size: 1024, dynamic: true};

        const target = interaction.options.getUser("user") || user;

        const member = await guild.members.fetch(target.id);
        const avatar = 
            member.avatarURL(imagePropierties) ||
            member.user.avatarURL(imagePropierties)

            if (!avatar) return interaction.reply("Este usuario no tiene avatar");

        const Embed = new Discord.EmbedBuilder()
            .setAuthor({
                name: `Pedido por ${user.username}`,
                iconURL: user.avatarURL(),
            })
            .setTitle("Avatar generado :D")
            .setColor("Aqua")
            .setImage(avatar)
            .setFooter({
                text: client.user.username,
                iconURL: client.user.avatarURL(),
            });

            interaction
                .reply({
                    embeds: [Embed],
                })
                .catch(console.error)
        },
}