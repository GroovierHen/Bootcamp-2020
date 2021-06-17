import express from "express";
import cors from "cors";

import { sendNotificationToClient } from "./notify";

const PORT = process.env.PORT || 8000;
const app = express();

app.use(cors());
app.use(express.json());

app.post("/send-notification", async (req, res) => {
  const { title, body, tokens } = req.body;
  try {
    const notificationData = {
      title,
      body,
    };
    await sendNotificationToClient(tokens, notificationData);
    res.status(200).json({ message: "Message send successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.stack });
  }
});

app.listen(PORT, () => console.log(`Server is Listening on PORT ${PORT}`));
