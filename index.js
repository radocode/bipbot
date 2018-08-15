const botconfig = require("./botconfig.json");
const superagent = require("superagent");
const Discord = require("discord.js");
const bot = new Discord.Client({ disableEveryone: true });
const prefix = botconfig.prefix;

bot.on("ready", async () => {
    console.log(`${bot.user.username} is online!`);
    bot.user.setActivity("your Bips!", 0);
});

bot.on("message", async message => {
    if (message.author.bot) return;
    if (message.channel.type === "dm") return;

    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

    if (cmd === `${prefix}hello`) {
        message.channel.send("Hello!");
    }
    if (cmd === `${prefix}bip`) {
        let bip = messageArray[1];
        console.log(`Consultando saldo de Bip: ${bip}`);

        let { body } = await superagent.get(`http://bip-servicio.herokuapp.com/api/v1/solicitudes.json?bip=${bip}`);

        console.log(`Saldo: ${body.saldoTarjeta}`);
        let saldoembed = new Discord.RichEmbed()
        .setColor("#4286f4")
        .setTitle(`:bus: Bip numero ${bip}`)        
        .setDescription(`Saldo: ${body.saldoTarjeta} Fecha Saldo: ${body.fechaSaldo}`);        

        message.channel.send(saldoembed);
    }

});


bot.login(botconfig.token);
