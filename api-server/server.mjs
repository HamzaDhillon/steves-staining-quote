import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Resend } from "resend";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const resend = new Resend(process.env.RESEND_API_KEY);

app.post("/resend-email", async (req, res) => {
  const { to, subject, html } = req.body;

  try {
    const data = await resend.emails.send({
      from: "Estimates <steve@instantestimates.ca>", // This must be verified in Resend dashboard
      to,
      subject,
      html,
    });

    res.json({ success: true, data });
  } catch (err) {
    console.error("Resend error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`);
});
