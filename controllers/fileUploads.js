const serviceAccount = require("../servis-app-2a54c-firebase-adminsdk-ez9dx-4e52433e62.json");
const admin = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "servis-app-2a54c.appspot.com",
});

const storage = admin.storage().bucket();
const firestore = admin.firestore();

exports.uploadToStorage = async (req, res, next) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ message: "Document or image file missing" });
    }
    const file = req.file;

    const fileUpload = storage.file(file.originalname);
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
