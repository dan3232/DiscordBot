const Discord = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders');
const { joinVoiceChannel, createAudioPlayer, createAudioResource, StreamType } = require('@discordjs/voice');
const fs = require('fs');

//no vale nada
module.exports = {
    // Datos del comando
    data: new SlashCommandBuilder()
        .setName('unirse')
        .setDescription('Se une al canal de voz y comienza a grabar'),

    // Ejecución del comando
    async execute(interaction) {
        // Verifica si el autor del mensaje está en un canal de voz
        if (interaction.member.voice.channel) {
            // Intenta unirse al canal de voz
            const connection = joinVoiceChannel({
                channelId: interaction.member.voice.channel.id,
                guildId: interaction.guild.id,
                adapterCreator: interaction.guild.voiceAdapterCreator,
            });

            // Crear un receptor de audio
            const receiver = connection.receiver;

            // Crear un stream de escritura para guardar el audio
            const writeStream = fs.createWriteStream('audio.pcm');

            // Cuando se recibe audio, escribirlo en el archivo
            receiver.subscribe(connection).on('data', (chunk) => {
                writeStream.write(chunk);
            });

            // Crear un reproductor de audio
            const player = createAudioPlayer();

            // Reproducir el audio recibido
            connection.subscribe(player);

            interaction.reply('¡Me he unido al canal de voz y estoy grabando!');
        } else {
            interaction.reply('¡Debes estar en un canal de voz para usar este comando!');
        }
    },
};
