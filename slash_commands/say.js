const Discord = require("discord.js");

module.exports = {
    data: new Discord.SlashCommandBuilder()
        .setName("say")
        .setDescription("Repite lo que digas :D")
        .addStringOption((option) => 
            option
                .setName("mensaje")
                .setDescription("Mensaje que repetira el bot")
                .setMinLength(5)
                .setMaxLength(100)
                .setRequired(true)
        ),

    //ejecución del comando
    execute: async ( interaction ) => {
        //Obtener texto
        const text = interaction.options.getString("mensaje");

        // Respondemos la interacción
        interaction.reply(text).catch(console.error);
    },
}