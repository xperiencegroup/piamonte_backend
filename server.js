import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.post("/send-email", async (req, res) => {
  try {
    const { name, email, phone, lote } = req.body;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: "emmsanchezaranda@hotmail.com",
      subject: "Nuevo cliente interesado",
      html: `
        <h2>Nuevo cliente interesado</h2>

        <p><b>Nombre:</b> ${name}</p>
        <p><b>Correo:</b> ${email}</p>
        <p><b>Teléfono:</b> ${phone}</p>
        <p><b>Lote:</b> ${lote || "No especificado"}</p>
      `,
    });

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
    });
  }
});

app.listen(3001, () => {
  console.log("Server running on port 3001");
});
