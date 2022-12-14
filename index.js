const qrcode = require('qrcode-terminal');
const axios = require('axios');
const fs = require('fs')


//autenticacion del bot con qr
const { Client, LocalAuth, MessageMedia, MessageAck } = require('whatsapp-web.js');
const client = new Client({
    authStrategy: new LocalAuth
});

//qr para enlazar numero 
client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

//evento al inciar el bot 
client.on('ready', () => {
    console.log('Client is ready!');
    client.getChats().then(chats => {
        const myGroup = chats.find((chat) => chat.name === "ignorar");
        

        console.log(myGroup); //datos del grupo donde manda mensaje de inicio 
        client.sendMessage(myGroup.id._serialized, "Hola soy Jayden" ) //mensaje de inico 


        //esto es solo una pruebaa para que imprima la hora por consola no es necesario
        // create a new `Date` object
        var today = new Date();

        var moment = require('moment');
        var now = moment().format("HH:mm A")
        var ahora = "a"
        if( ahora != now ){
            console.log(now);
            ahora = now
        } 
    });

});

//evento cuando llega un mensaje
client.on('message', async message => {
    const contenido = message.body

	if(contenido === 'ping' || contenido === 'Ping') {
		message.reply('pong');
	}

    if(contenido === 'pong'|| contenido === 'Pong') {
		message.reply('ping');
	}

    if(contenido === 'Jayden') {
		message.reply('Que wea querí culiao');
	}

    if(contenido === 'Chupalo') {
		message.reply('tu mamá');
	}
if(contenido === 'que' || contenido == "Que" || contenido=="Qué" || contenido == "q" || contenido == "Q" || contenido == "k"|| contenido == "k" || contenido == "qe" || contenido == "Qe" || contenido == "Ke" || contenido == "ke" || contenido == "QUE" || contenido == "QE") {

        const sticker = MessageMedia.fromFilePath('./que.png');
        message.reply(sticker, null, {stickerAuthor: 'JaydenBot', sendMediaAsSticker: true})
	}

    if(contenido === 'meme'){
        const meme = await axios("https://meme-api.herokuapp.com/gimme")
        .then(res => res.data)
        
        client.sendMessage(message.from, await MessageMedia.fromUrl(meme.url))
    }
    //envia imagen default
    if(contenido === 'Imagen') {
        client.sendMessage(message.from,MessageMedia.fromFilePath('./Pong.png') )

	}
    //envia la imagen default como sticker
    if(contenido === 'StickerDefault') {
        const sticker = MessageMedia.fromFilePath('./Pong.png');

        message.reply(sticker, null, {stickerAuthor: 'JaydenBot', sendMediaAsSticker: true})

    }

    //si le llega una imagen y tiene el comando Sticker, la guarda y la envia como sticker
    if(message.hasMedia && contenido === 'Sticker'){
        const media = await message.downloadMedia()
     
        message.reply(media, null, {stickerAuthor: 'By camus', stickerName: "JaydenBot", sendMediaAsSticker: true})
    }
    
});
client.initialize();
 