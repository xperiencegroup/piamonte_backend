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
      subject: `Solicitud de información - ${name}`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 560px; margin: 0 auto; border: 1px solid #e0d8cf; padding: 40px; background-color: #faf8f5; color: #3b2f2f;">
          
          <h1 style="font-size: 22px; font-weight: normal; letter-spacing: 2px; text-transform: uppercase; border-bottom: 1px solid #c8b99a; padding-bottom: 16px; margin-bottom: 24px; color: #3b2f2f;">
            Piamonte Residencial
          </h1>

          <p style="font-size: 13px; color: #7a6a5a; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 24px;">
            Nueva solicitud de información
          </p>

          <table style="width: 100%; border-collapse: collapse; font-size: 15px;">
            <tr style="border-bottom: 1px solid #e0d8cf;">
              <td style="padding: 12px 0; color: #7a6a5a; width: 40%;">Nombre</td>
              <td style="padding: 12px 0; color: #3b2f2f;">${sanitize(name)}</td>
            </tr>
            <tr style="border-bottom: 1px solid #e0d8cf;">
              <td style="padding: 12px 0; color: #7a6a5a;">Correo</td>
              <td style="padding: 12px 0; color: #3b2f2f;">${sanitize(email)}</td>
            </tr>
            <tr style="border-bottom: 1px solid #e0d8cf;">
              <td style="padding: 12px 0; color: #7a6a5a;">Teléfono</td>
              <td style="padding: 12px 0; color: #3b2f2f;">${sanitize(phone)}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; color: #7a6a5a;">Lote de interés</td>
              <td style="padding: 12px 0; color: #3b2f2f;">${lote ? sanitize(lote) : "No especificado"}</td>
            </tr>
          </table>

          <p style="margin-top: 32px; font-size: 12px; color: #b0a090; letter-spacing: 1px;">
            Este mensaje fue generado automáticamente desde piamonteresidencial.mx
          </p>

        </div>
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
