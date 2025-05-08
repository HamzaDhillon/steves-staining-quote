const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();

// ✅ Fix CORS for React dev server
const corsOptions = {
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type"],
  credentials: true,
};

app.use(cors(corsOptions));

// Optional: explicitly handle OPTIONS for all routes
app.options("*", cors(corsOptions));

app.use(express.json());

const transporter = nodemailer.createTransport({
  host: "smtp.hostinger.com",
  port: 465,
  secure: true,
  auth: {
    user: "steve@instantestimates.ca",
    pass: "@Sam6uel",
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.error("SMTP Config Error:", error);
  } else {
    console.log("✅ SMTP Server is ready to send emails");
  }
});

app.post("/send-quote-email", async (req, res) => {
  const { to, subject, text } = req.body;

  try {
    await transporter.sendMail({
      from: '"Steve\'s Staining" <steve@instantestimates.ca>',
      to,
      subject,
      text,
    });

    res.json({ success: true });
  } catch (err) {
    console.error("Email error:", err);
    res.status(500).json({ error: "Failed to send email" });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
