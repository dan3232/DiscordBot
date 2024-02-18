const Discord = require("discord.js");

module.exports = {
    //Datos del comando
    data: new Discord.SlashCommandBuilder()
        .setName("random")
        .setDescription("Genera un número random del 1 al 10"),
        //ejecución del comando
        execute: async (interaction) => {
            //generador de número aleatorio
            const randomNum = Math.floor(Math.random()*10);


            //respuesta
            interaction
                .reply(`Tu número aleatorio es: ${randomNum}`)
                .catch(console.error); 
        }
}