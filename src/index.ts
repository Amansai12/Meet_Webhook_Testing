
import express from "express";
import crypto from 'crypto';
import bodyParser from "body-parser";
const app = express();

app.use(bodyParser.json());

const ZOOM_SECRET_TOKEN = 'XtcLIeZtQ0aB6uwQJpvnsw';

app.get("/", (req, res) => {
  res.send("Hello World!");
});     

app.post('/webhook/zoom', async (req: any, res: any) => {
    const { plainToken } = req.body as { plainToken?: string };

    if (plainToken) {
        // Generate the encrypted token using HMAC SHA-256
        const encryptedToken = crypto
          .createHmac('sha256', ZOOM_SECRET_TOKEN)
          .update(plainToken)
          .digest('hex');
    
        // Respond with the required JSON format
        return res.status(200).json({
          plainToken,
          encryptedToken,
        });
      }
    
      // Handle regular webhook events (meeting started, ended, etc.)
      console.log('Received Zoom Event:', req.body.event);
      res.status(200).send('Event received');
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});