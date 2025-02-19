import { Client, LocalAuth } from "whatsapp-web.js";
import qrcode from "qrcode-terminal";

const client = new Client({
  authStrategy: new LocalAuth(),
});

client.on("qr", (qr) => {
  console.log("Scan this QR code to connect:");
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("WhatsApp bot is ready!");
});

client.initialize();

export const sendWhatsAppMessage = async (adminNumber, message) => {
  try {
    await client.sendMessage(`${adminNumber}@c.us`, message);
    console.log("Message sent successfully!");
  } catch (error) {
    console.error("Error sending message:", error);
  }
};
