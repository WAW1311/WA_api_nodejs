const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client({
    authStrategy: new LocalAuth(),
    webVersionCache: 
  {
    remotePath: 'https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2407.1-beta.html',
    type: 'remote' 
  }
});

client.on('qr', (qr) => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message', msg => {
    if (msg.body == '!ping') {
        msg.reply('pong');
    }
});

client.initialize();

const api = async (req, res) => {
    var nohp = req.query.nohp;
    var pesan = req.query.pesan;

    try {
        if (nohp.startsWith("0")){
            nohp = '62'+ nohp.slice(1) +'@c.us';
        }else if (nohp.startsWith("62")) {
            nohp = nohp + '@c.us';
        } else {
            nohp = '62'+ nohp +'@c.us';
        };

        const user = await client.isRegisteredUser(nohp);

        if (!user) {
            response = {
                status: 404,
                no_hp:nohp,
                message:pesan,
                msg : 'User not registered'
            };
            res.json(response);
            return false;
        };
        client.sendMessage(nohp, pesan);
        var response = {
            status: 200,
            no_hp :nohp,
            message:pesan,
            msg :"berhasil terkirim"
        };
        res.json(response);
    }catch(error) {
        console.log(error);
    };
};

module.exports = api;