//Dependencias
const Discord = require("discord.js");
const fs = require("fs");
const config = require("./config.json");


//Cliente de discord
const Client = new Discord.Client({ 
    intents: 3243773,
});

//Cargar comandos
Client.commands = new Discord.Collection();

fs.readdirSync("./slash_commands").forEach((commandFile) => {
    const command = require(`./slash_commands/${commandFile}`); 
    Client.commands.set(command.data.name, command);
});

// Registrar comandos
const REST = new Discord.REST().setToken(config.CLIENT_TOKEN);

(async () => {
    try {
        await REST.put(
            Discord.Routes.applicationGuildCommands(config.clientID, config.guildId),
            {
                body: Client.commands.map((cmd) => cmd.data.toJSON()),
            }
        );
        console.log(`Loaded ${Client.commands.size} slash commands {/}`);
    } catch (error) {
        console.log("Error loading commands.", error);
    }
})();

// Contenido (eventos)
Client.on("ready", async (client) => {
    console.log("Bot Online!");
})

// Evento interaccionCreate: Se ejecuta cuando un usuario de la comunidad utiliza una interacción
Client.on("interactionCreate", async (interaction) => {
    // Si la interacción es un slash commands
    if(interaction.isChatInputCommand()) {
        // Obtiene los datos del comando
        const command = Client.commands.get(interaction.commandName);
        // Ejecuta el comando
        command.execute(interaction).catch(console.error);
    } else {
        // Si la interacción no es un slash command (botones, menus, etc... )
    }
})

//conexión
Client.login(config.CLIENT_TOKEN);
