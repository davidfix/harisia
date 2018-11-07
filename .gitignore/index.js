const Discord = require("discord.js");

var bot = new Discord.Client();

var prefix = (".");

const ytdl = require("ytdl-core");

const queue = new Map();

var servers = {};

const FileSync = require('lowdb/adapters/FileSync')

const low = require('lowdb')

const adapters = new FileSync('database.json');

const db = low(adapters);

bot.on("ready", function() {
    bot.user.setGame("HarisiaBot | .aide");
    console.log("Connection : Ok");
})

bot.login("NTA4Mzk1NjU3MjA4NTI4ODk3.Dr-oZg.PDBBSWhWOEwIoMWsD0ErT2ZTyZ4")

bot.on("guildMemberAdd", member=> {
    member.guild.channels.find("name", "🌐bienvenue🌐").send(`Bienvenue à ${member} sur le serveur Harisia ! Merci de lire les régles dans le #règlement et passe un bon jeu avec nous :tada::hugging: !!`)
    member.addRole("name", "HARISIN")
})

bot.on("guildMemberRemove", member=> {
    member.guild.channels.find("name", "🌐bienvenue🌐").send(`En revoir à ${member} Bonne continuation et à bientôt !!`)
})

db.defaults({ histoires : [], xp: []}).write()
 

bot.on('message', message => {
    
    var msgauthor = message.author.id
 
    if(message.author.bot)return;
 
    if(!db.get("xp").find({user : msgauthor}).value()){
        db.get("xp").push({user : msgauthor, xp: 1}).write();
    }else{
        var userxpdb = db.get("xp").filter({user : msgauthor}).find("xp").value();
        console.log(userxpdb)
        var userxp = Object.values(userxpdb)
        console.log(userxp)
        console.log(`Nombre d'xp: ${userxp[1]}`)
 
        db.get("xp").find({user: msgauthor}).assign({user: msgauthor, xp: userxp[1] += 1}).write();
 
        if (message.content === prefix + "xp"){
            var xp = db.get("xp").filter({user: msgauthor}).find('xp').value()
            var xpfinal = Object.values(xp);
            var xp_embed = new Discord.RichEmbed()
                .setTitle(`Stat des XP de : ${message.author.username}`)
                .setColor('#F4D03F')
                .addField("XP", `${xpfinal[1]} xp`)
                .setFooter("By David Fox")
            message.channel.send({embed : xp_embed})
        }
    }
})



bot.on('message', msg => {
    if(msg.content[0] === prefix) {
        if(msg.content === prefix + 'Harisin') {
            let role = msg.guild.roles.find('name', 'HARISIN')

            if(msg.member.roles.find('name', 'HARISIN')) {
                msg.member.removeRole(role)
            }
            else {
                msg.member.addRole(role)
            }
        }
    }

})
function newFunction() {
    return ".";
}





bot.on('message', message => {
    if(message.author.bot)return;
        if (message.content === prefix + "aide"){
            var embed = new Discord.RichEmbed()
                .setTitle(`Voici les commandes disponibles ${message.author.username}`)
                .setColor('#F4D03F')
                .addField(".Harisin", 'pour vous mettre le grade Harisin si vous allez jouer sur le serveur MCPE Harisia')
                .addField(".xp", 'pour vous donnez votre XP')
                .addField(".infos", 'pour avoir les informations du serveur')
                .setFooter("By David Fox")
            message.channel.send(embed);
            console.log("Demandé!")
     }
})

bot.on('message', message => {
    if(message.author.bot)return;
        if (message.content === prefix + "infos"){
            var embed = new Discord.RichEmbed()
                .setTitle(`Voici les informations du serveur  ${message.author.username}`)
                .setColor('#F4D03F')
                .addField("Nom du serveur", 'Harisia')
                .addField("Description du serveur", 'ce serveur discord est un serveur consacré au serveur MCPE Minecraft Harisia qui est en dévellopement actuellement.')
                .addField("Nombre de joueurs", message.guild.memberCount)
                .addField("Nombre de channel", message.guild.channels.size)
                .setFooter("By David Fox")
            message.channel.send(embed);
            console.log(".Serveur Demandé!")
     }
})
