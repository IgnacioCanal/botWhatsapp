const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client({
    authStrategy: new LocalAuth()
});

client.on('qr', (qr) => {
    console.log('Escanea este QR para iniciar sesión:');
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('El bot está listo para usar.');
});

client.on('group_join', (notification) => {
  const chatId = notification.id.remote;
  const newUser = notification.recipientIds[0];
  
  const mensajeBienvenida = `
🌟 *¡Bienvenido/a, @${newUser.replace('@c.us', '')}! 🎉*

Antes de empezar a disfrutar, recordemos algunas reglas importantes:

1️⃣ No suban material que pueda comprometerlos. ¡Cuidemos nuestra privacidad! 🔒  
2️⃣ No compartan contenido que infrinja las normas de WhatsApp. Evitemos problemas. 🚫  
3️⃣ Respetemos a todos los integrantes. Este es un espacio de buena onda. ✨  
4️⃣ ¡No nos hacemos responsables de las consecuencias de participar en este grupo! 🤷‍♂️

💃 *¡Venimos a bailar y a disfrutar de la señorita Mónica!* 🕺
`;

  client.sendMessage(chatId, mensajeBienvenida, { mentions: [newUser] });
  console.log(`Mensaje de bienvenida enviado a ${newUser}`);
});

client.initialize();
