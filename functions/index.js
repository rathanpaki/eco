const functions = require("firebase-functions");
const admin = require("firebase-admin");
const cors = require("cors")({ origin: true });

admin.initializeApp();

exports.sendThankYouEmail = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    if (req.method !== "POST") {
      return res.status(405).send("Method Not Allowed");
    }

    const { email } = req.body;

    if (!email) {
      return res.status(400).send("Email is required");
    }

    try {
      // Simulate sending an email (replace with actual email logic)
      console.log(`Sending thank you email to ${email}`);
      res.status(200).send("Email sent successfully");
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).send("Internal Server Error");
    }
  });
});
