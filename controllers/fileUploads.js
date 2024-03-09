const admin = require("firebase-admin");

const serviceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "servis-app-2a54c.appspot.com",
});

const storage = admin.storage().bucket();
const firestore = admin.firestore();

exports.uploadToStorage = async (req, res, next) => {
  try {
    if (!req.file) {
      return next();
    }
    const file = req.file;

    const fileUpload = storage.file(file.originalname || "");
    const stream = fileUpload.createWriteStream();
    stream.end(file.buffer);

    const downloadURL = await fileUpload.getSignedUrl({
      action: "read",
      expires: "2025-03-09T12:00:00Z",
    });

    req.downloadURL = downloadURL[0];

    next();
  } catch (error) {
    console.log("error in uploading to storage", error);
    res.status(500).json({ message: "Something went worng uploading file" });
  }
};
