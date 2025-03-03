const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

// Nombre del grupo configurado
const GRUPO_NOMBRE = "Nombre del Grupo";

const client = new Client({
    authStrategy: new LocalAuth()
});

client.on('qr', (qr) => {
    console.log('Escanea este QR para iniciar sesión:');
    qrcode.generate(qr, { small: true });
});

client.on('ready', async () => {
    console.log('El bot está listo.');

    try {
        const chats = await client.getChats();
        const grupo = chats.find(chat => chat.name === GRUPO_NOMBRE);

        if (!grupo) {
            console.log(`❌ Error: No se encontró el grupo con nombre: ${GRUPO_NOMBRE}`);
        } else {
            console.log(`✅ Bot configurado para el grupo con nombre: ${GRUPO_NOMBRE} (ID: ${grupo.id._serialized})`);
        }

        console.log('Grupos disponibles:');
        chats.filter(chat => chat.isGroup).forEach(grupo => {
            console.log(`Nombre: ${grupo.name}, ID: ${grupo.id._serialized}`);
        });
    } catch (error) {
        console.error('Error al obtener los chats:', error);
    }
});

client.on('group_join', async (notification) => {
    console.log(`Evento group_join recibido:`);
    console.log(notification); // Imprimir el objeto completo de notification

    const chat = await client.getChatById(notification.chatId); // Obtenemos el objeto completo del grupo
    if (chat.name === GRUPO_NOMBRE) {
        const newUser = notification.recipientIds[0]; // Obtener el usuario que se unió

        const mensajeBienvenida = `Mensaje`;

        client.sendMessage(chat.id._serialized, mensajeBienvenida, { mentions: [newUser] });
        console.log(`Mensaje de bienvenida enviado a @${newUser.replace('@c.us', '')} en el grupo con nombre: ${GRUPO_NOMBRE}`);
    } else {
        console.log(`El evento no ocurrió en el grupo configurado. Ignorando...`);
    }
});

client.initialize();
